"use client";

/**
 * Butler LanguageSwitcher — the tiny EN / ES pill in the nav.
 *
 * Design notes:
 *  - Quiet by design. Not a dropdown, not a modal, not a flag icon. Just two
 *    letters the user can tap. The active one is ink; the inactive one is
 *    soft and ghosted. One tap flips the whole page.
 *  - Accessible: it's a <div role="group"> wrapping two real <button>s with
 *    aria-pressed so screen readers announce the current language.
 *  - Reusable: drop this anywhere — nav, signup flow, in-app settings. It
 *    talks to the shared LanguageProvider so every surface stays in sync.
 */

import { LOCALES, type Locale } from "@/lib/translations";
import { useLanguage } from "@/lib/i18n";

const LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

const A11Y_NAMES: Record<Locale, { en: string; es: string }> = {
  en: { en: "Switch to English", es: "Cambiar a inglés" },
  es: { en: "Switch to Spanish", es: "Cambiar a español" },
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("nav.languageLabel")}
      className={`inline-flex items-center rounded-full border border-ink/15 bg-white/70 p-1 text-xs font-semibold backdrop-blur ${className}`}
    >
      {LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={A11Y_NAMES[code][locale]}
            className={`rounded-full px-3 py-1.5 transition ${
              active
                ? "bg-ink text-cream shadow-sm"
                : "text-ink/60 hover:text-ink"
            }`}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
