"use client";

/**
 * Butler i18n — tiny, dependency-free language provider.
 *
 * Design goals (per Butler principles):
 *  - Zero runtime deps. Nothing to keep current.
 *  - Client-only. No server-side locale detection, no cookies, no middleware.
 *    On first visit we read the browser's preferred language; after that,
 *    the user's explicit choice in localStorage always wins.
 *  - Silent by default. We never route-switch, we never reload the page,
 *    we never show a loud modal asking "what language?". We just render in
 *    the best guess, and if the user wants to change it, the little widget
 *    in the nav lets them flip it in one tap.
 *  - Graceful fallback. Missing keys fall back to English so nothing breaks
 *    mid-session. In dev we warn to the console so translators can catch gaps.
 *
 * How to use:
 *   const { t, locale, setLocale } = useLanguage();
 *   return <h1>{t("hero.title.butler")}</h1>;
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LOCALES, translations, type Locale } from "./translations";

const STORAGE_KEY = "butler.locale";
const DEFAULT_LOCALE: Locale = "en";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // localStorage disabled (private mode, etc.) — fall through to browser guess.
  }

  const nav = window.navigator;
  const candidates: string[] = [];
  if (nav.languages && nav.languages.length) candidates.push(...nav.languages);
  if (nav.language) candidates.push(nav.language);

  for (const tag of candidates) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // We start with the server-rendered default so hydration matches, then
  // sync to the real preference in an effect. This avoids the React
  // "hydration mismatch" warning while still landing on the right language
  // on the first paint-after-mount.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
    setHydrated(true);
  }, []);

  // Reflect the current locale on <html lang="..."> so screen readers,
  // browser translation, and CSS :lang() selectors all agree with us.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Persistence is best-effort. If storage is disabled, the choice
      // still holds for the current session.
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const active = hydrated ? locale : DEFAULT_LOCALE;
      const value = translations[active]?.[key];
      if (typeof value === "string") return value;

      // Fallback chain: active locale → English → the raw key.
      const fallback = translations.en?.[key];
      if (typeof fallback === "string") {
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.warn(`[butler.i18n] Missing "${active}" translation for key: ${key}`);
        }
        return fallback;
      }

      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`[butler.i18n] Missing translation key entirely: ${key}`);
      }
      return key;
    },
    [locale, hydrated]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useLanguage() must be used inside <LanguageProvider>. Wrap your tree in app/layout.tsx."
    );
  }
  return ctx;
}
