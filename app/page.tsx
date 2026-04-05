"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Reusable bits ---------- */

function Squiggle({
  className = "",
  color = "#9A86B8",
  path = "M2,40 Q40,2 80,40 T160,40 T240,40 T320,40",
  width = 340,
  height = 80,
}: {
  className?: string;
  color?: string;
  path?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-draw
      />
    </svg>
  );
}

function Star({
  className = "",
  color = "#160F22",
  size = 22,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      className={`absolute ${className}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
    >
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
      />
    </svg>
  );
}

/* ---------- The page ---------- */

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Hero word reveal */
      const words = gsap.utils.toArray<HTMLElement>(".hero-word > span");
      gsap.set(words, { yPercent: 110 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.055,
        delay: 0.15,
      });

      /* 2. Hero sub fade + CTA rise */
      gsap.from(".hero-sub", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(".hero-cta", {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.05,
      });
      gsap.from(".hero-eyebrow", {
        y: 12,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.05,
      });

      /* 3. Squiggle draw-in */
      const paths = gsap.utils.toArray<SVGPathElement>("[data-draw]");
      paths.forEach((p) => {
        const length = p.getTotalLength();
        gsap.set(p, { strokeDasharray: length, strokeDashoffset: length });
      });
      paths.forEach((p) => {
        ScrollTrigger.create({
          trigger: p,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(p, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.out",
            });
          },
        });
      });

      /* 4. Phone floats */
      gsap.to(".phone-float", {
        y: -14,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".phone-float-b", {
        y: 14,
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* 5. Parallax on hero phone wrapper */
      gsap.to(".hero-phone-wrap", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* 6. Section reveals */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        });
      });

      /* 7. Feature card stagger */
      ScrollTrigger.create({
        trigger: ".feature-grid",
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.from(".feature-card", {
            y: 80,
            opacity: 0,
            rotation: (i) => (i % 2 === 0 ? -2.5 : 2.5),
            duration: 1.1,
            stagger: 0.12,
            ease: "expo.out",
          });
        },
      });

      /* 8. Tato portrait slight tilt on scroll */
      gsap.to(".tato-portrait", {
        rotate: 2,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".tato",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* 9. Pricing cards lift */
      ScrollTrigger.create({
        trigger: ".pricing",
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.from(".price-card", {
            y: 90,
            opacity: 0,
            duration: 1.1,
            stagger: 0.14,
            ease: "expo.out",
          });
        },
      });

      /* 10. Nav shrink on scroll */
      ScrollTrigger.create({
        start: 60,
        end: "max",
        onUpdate: (self) => {
          const nav = document.querySelector(".nav");
          if (!nav) return;
          if (self.progress > 0) {
            nav.classList.add("nav-scrolled");
          } else {
            nav.classList.remove("nav-scrolled");
          }
        },
      });

      /* 11. Magnetic buttons */
      const magnets = gsap.utils.toArray<HTMLElement>(".magnetic");
      magnets.forEach((m) => {
        const move = (e: MouseEvent) => {
          const rect = m.getBoundingClientRect();
          const x = e.clientX - (rect.left + rect.width / 2);
          const y = e.clientY - (rect.top + rect.height / 2);
          gsap.to(m, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(m, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        };
        m.addEventListener("mousemove", move);
        m.addEventListener("mouseleave", leave);
      });

      /* 12. Big CTA wordmark rotate in */
      gsap.from(".big-wordmark", {
        scale: 0.82,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".big-cta", start: "top 80%", once: true },
      });

      /* 13. Star twinkles */
      gsap.utils.toArray<HTMLElement>(".twinkle").forEach((el, i) => {
        gsap.to(el, {
          scale: 1.35,
          rotate: 15,
          duration: 1.6 + (i % 3) * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-x-clip">
      {/* NAV */}
      <nav className="nav fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-ink text-sun grid place-items-center font-display text-2xl italic">
              B
            </div>
            <span className="font-chunky text-xl font-bold tracking-tight text-ink">
              Butler
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#story" className="text-sm text-ink/70 hover:text-ink">The story</a>
            <a href="#how" className="text-sm text-ink/70 hover:text-ink">How it works</a>
            <a href="#together" className="text-sm text-ink/70 hover:text-ink">Together</a>
            <a href="#pricing" className="text-sm text-ink/70 hover:text-ink">Pricing</a>
          </div>
          <a
            href="/app"
            className="magnetic inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-soft"
          >
            Open Butler
            <span aria-hidden>→</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="hero relative min-h-[100svh] pt-36 pb-24 md:pt-40">
        {/* Background squiggles */}
        <Squiggle
          className="top-28 left-[-40px] opacity-70"
          path="M2,40 Q40,2 80,40 T160,40 T240,40 T320,40"
          width={340}
          height={80}
        />
        <Squiggle
          className="top-[58%] right-[-20px]"
          color="#B99FD4"
          path="M2,50 C40,10 80,80 120,40 S200,10 260,50 S340,60 398,20"
          width={400}
          height={90}
        />
        <Squiggle
          className="bottom-12 left-[20%] opacity-60"
          color="#9A86B8"
          path="M2,30 Q60,60 120,20 T240,30"
          width={260}
          height={70}
        />
        <Star className="top-36 right-[18%] twinkle" color="#F5C842" size={28} />
        <Star className="top-[55%] left-[8%] twinkle" color="#160F22" size={18} />
        <Star className="bottom-24 right-[30%] twinkle" color="#F2C4C4" size={22} />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <div className="hero-eyebrow mb-6 inline-flex items-center gap-3 rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" />
              A little helper, arriving soon
            </div>
            <h1 className="font-chunky text-[clamp(2.6rem,7.2vw,6.4rem)] font-bold leading-[0.95] tracking-tightest text-ink">
              <div>
                <span className="hero-word word"><span>Butler</span></span>{" "}
                <span className="hero-word word"><span>remembers.</span></span>
              </div>
              <div className="mt-2 font-display italic font-normal text-ink-soft">
                <span className="hero-word word"><span>So</span></span>{" "}
                <span className="hero-word word"><span>you</span></span>{" "}
                <span className="hero-word word"><span>don&rsquo;t</span></span>{" "}
                <span className="hero-word word"><span>have</span></span>{" "}
                <span className="hero-word word"><span>to.</span></span>
              </div>
            </h1>
            <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
              A little helper for the things you&rsquo;d rather not forget — from
              your morning pills to your daughter&rsquo;s birthday. Butler keeps
              it all, quietly, and nudges you at exactly the right moment.
            </p>
            <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
              <a
                href="/app"
                className="magnetic group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-base font-semibold text-white shadow-[0_20px_40px_-20px_rgba(22,15,34,0.45)] transition hover:bg-ink-soft"
              >
                Open Butler
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="#story" className="text-sm font-medium text-ink/70 underline-offset-4 hover:text-ink hover:underline">
                or meet Tato first
              </a>
            </div>

            <div className="mt-14 flex items-center gap-6 text-xs text-ink/50">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-lavender-100 bg-mint" />
                <div className="h-8 w-8 rounded-full border-2 border-lavender-100 bg-cream" />
                <div className="h-8 w-8 rounded-full border-2 border-lavender-100 bg-blush" />
              </div>
              <span>Quietly helping people remember the things that matter.</span>
            </div>
          </div>

          {/* Hero phone mockup */}
          <div className="hero-phone-wrap relative md:col-span-5">
            <div className="phone-float relative mx-auto w-[280px] md:w-[320px]">
              <PhoneMockup />
            </div>
            <div className="phone-float-b absolute -bottom-6 -left-6 hidden md:block">
              <div className="card-shadow rotate-[-6deg] rounded-3xl bg-cream p-5 w-56">
                <div className="flex items-center gap-2 text-xs font-semibold text-ink/70">
                  <span className="h-2 w-2 rounded-full bg-sun" />
                  IN 10 MINUTES
                </div>
                <p className="mt-2 font-chunky text-lg leading-tight text-ink">
                  Take the blue pills with water
                </p>
                <p className="mt-1 text-xs text-ink/60">Butler&rsquo;s been holding this for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="relative -my-2 overflow-hidden border-y border-ink/10 bg-ink text-cream">
        <div className="marquee-track flex w-max whitespace-nowrap py-5 text-xl font-display italic">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8">
              remember the small things
              <span className="text-sun">✦</span>
              be there for the people who love you
              <span className="text-sun">✦</span>
              never miss the appointment that matters
              <span className="text-sun">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS - FEATURE GRID */}
      <section id="how" className="relative py-32 md:py-40">
        <Squiggle
          className="top-20 right-10 opacity-60"
          color="#B99FD4"
          path="M2,40 Q40,2 80,40 T160,40 T240,40"
          width={260}
          height={80}
        />
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">
              What Butler does
            </div>
            <h2 className="font-chunky text-5xl font-bold leading-[1] tracking-tightest text-ink md:text-7xl">
              Four small jobs, <br />
              <span className="font-display italic font-normal">done perfectly.</span>
            </h2>
          </div>

          <div className="feature-grid mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              bg="bg-mint"
              tag="01"
              title="Remembers the small things"
              body="Tell Butler once. Butler holds it — the pharmacy hours, the name of that nurse, the story you loved last Tuesday."
              icon={<BrainIcon />}
            />
            <FeatureCard
              bg="bg-cream"
              tag="02"
              title="Reminds you at the right moment"
              body="A gentle nudge by phone, email, and text — with confirmation it actually arrived. No missed appointments. Ever."
              icon={<BellIcon />}
            />
            <FeatureCard
              bg="bg-blush"
              tag="03"
              title="Helps the people who love you"
              body="Share Butler with one person you trust — or a whole family. They can help without hovering."
              icon={<HeartIcon />}
            />
            <FeatureCard
              bg="bg-ink text-cream"
              tag="04"
              title="Stays out of the way"
              body="Butler never asks more than it needs. It never guesses. It doesn't track your every move. It just shows up when it matters."
              icon={<LeafIcon color="#F5C842" />}
              dark
            />
          </div>
        </div>
      </section>

      {/* TATO STORY */}
      <section id="story" className="tato relative overflow-hidden bg-lavender-200 py-32 md:py-40">
        <Squiggle
          className="top-10 left-10"
          color="#9A86B8"
          path="M2,40 C40,2 80,80 120,40 S200,10 260,50 S340,60 398,20"
          width={400}
          height={90}
        />
        <Squiggle
          className="bottom-16 right-10"
          color="#9A86B8"
          path="M2,30 Q60,60 120,20 T240,30"
          width={260}
          height={70}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="reveal md:col-span-5">
            <div className="tato-portrait relative mx-auto w-full max-w-sm rotate-[-3deg]">
              <div className="card-shadow rounded-[28px] bg-white p-6">
                <PortraitIllustration />
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="font-chunky text-lg font-bold text-ink">Tato</div>
                    <div className="text-xs text-ink/60">78, lives next door to JRP</div>
                  </div>
                  <div className="text-2xl">✦</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 rotate-6 rounded-2xl bg-sun px-4 py-2 font-chunky text-sm font-bold text-ink">
                meet the reason
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-7">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">
              The story
            </div>
            <h2 className="font-chunky text-5xl font-bold leading-[1] tracking-tightest text-ink md:text-6xl">
              Built for Tato. <br />
              <span className="font-display italic font-normal">And for you.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
              <p>
                Tato is JRP&rsquo;s neighbor. He&rsquo;s 78. He has a daughter
                who loves him, a lot of prescriptions, and a calendar full of
                appointments he didn&rsquo;t ask for.
              </p>
              <p>
                He&rsquo;s also sharp, kind, and very ready to tell you when
                something feels like too much. The existing apps on his phone
                felt like too much. He deleted them.
              </p>
              <p className="relative rounded-2xl border-l-4 border-sun bg-white/60 p-6 font-display text-xl italic text-ink">
                &ldquo;I just want someone to remind me, quietly, when it&rsquo;s
                time. And I want my daughter to know I&rsquo;m okay without
                her having to call me every day.&rdquo;
              </p>
              <p>
                We built Butler for Tato. Which means we built it for anyone
                who wants a little help remembering the things that matter —
                and for the people who love them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOGETHER / SHARED CARE */}
      <section id="together" className="relative py-32 md:py-44">
        <Star className="top-20 left-[20%] twinkle" color="#F5C842" size={26} />
        <Star className="bottom-24 right-[16%] twinkle" color="#160F22" size={20} />
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">
              Better together
            </div>
            <h2 className="font-chunky text-5xl font-bold leading-[1] tracking-tightest text-ink md:text-7xl">
              One Butler. <br />
              <span className="font-display italic font-normal scribble-underline">The people who love you.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-ink/70">
              Share Butler with your daughter, your son, your best friend.
              They see what you choose to share. They help when they can. You
              stay the one in charge — always.
            </p>
          </div>

          <div className="reveal mt-20 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-16">
            <div className="phone-float">
              <PhoneMockup tone="tato" />
            </div>
            <div className="flex flex-col items-center gap-3 font-display text-4xl italic text-ink/60">
              <span className="twinkle">✦</span>
              <span>together</span>
              <span className="twinkle">✦</span>
            </div>
            <div className="phone-float-b">
              <PhoneMockup tone="daughter" />
            </div>
          </div>

          <div className="reveal mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Tato is always in charge",
                body: "The account is his. He decides what's shared, what's private, and can pull back access at any time with one tap.",
              },
              {
                title: "His daughter helps without hovering",
                body: "She sees his appointments, his medication reminders — only what he's chosen to share. She gets a nudge if something important was missed.",
              },
              {
                title: "No one feels watched",
                body: "Butler never narrates Tato's day. No 'he went here, he did that.' Just gentle help, from people he trusts.",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="card-shadow rounded-3xl border border-ink/8 bg-white p-7"
              >
                <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/40">
                  0{i + 1}
                </div>
                <h3 className="font-chunky text-2xl font-bold leading-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink/70">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="pricing relative bg-lavender-100 py-32 md:py-40">
        <Squiggle
          className="top-16 right-[12%]"
          color="#B99FD4"
          path="M2,40 Q40,2 80,40 T160,40 T240,40 T320,40"
          width={340}
          height={80}
        />
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mx-auto max-w-3xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink/50">
              Simple, like Butler
            </div>
            <h2 className="font-chunky text-5xl font-bold leading-[1] tracking-tightest text-ink md:text-7xl">
              Two plans. <br />
              <span className="font-display italic font-normal">That&rsquo;s it.</span>
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {/* Starter */}
            <div className="price-card card-shadow relative rounded-[32px] bg-white p-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-ink/50">
                    Butler
                  </div>
                  <div className="mt-1 font-chunky text-3xl font-bold text-ink">
                    For you
                  </div>
                </div>
                <div className="rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  Free
                </div>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <div className="font-chunky text-6xl font-bold text-ink">$0</div>
                <div className="text-sm text-ink/60">forever</div>
              </div>

              <ul className="mt-8 space-y-3 text-base text-ink/80">
                {[
                  "Everything Butler does",
                  "Reliable reminders by phone, email, and text",
                  "Room to remember the things that matter",
                  "Quiet by design — never in your face",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ink" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/app"
                className="magnetic mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-4 text-sm font-semibold text-ink transition hover:bg-ink hover:text-white"
              >
                Start with Butler — it&rsquo;s free
              </a>
            </div>

            {/* Pro */}
            <div className="price-card card-shadow relative rounded-[32px] bg-ink p-10 text-cream">
              <div className="absolute -top-4 left-10 rotate-[-3deg] rounded-full bg-sun px-4 py-2 font-chunky text-xs font-bold text-ink">
                for the people who love you
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-cream/70">
                    Butler Pro
                  </div>
                  <div className="mt-1 font-chunky text-3xl font-bold">
                    For you and yours
                  </div>
                </div>
                <div className="rounded-full bg-sun px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink">
                  $15/mo
                </div>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <div className="font-chunky text-6xl font-bold">$15</div>
                <div className="text-sm text-cream/70">/ month</div>
                <div className="ml-3 rounded-full border border-cream/30 px-3 py-1 text-xs text-cream/80">
                  save 33% yearly
                </div>
              </div>

              <ul className="mt-8 space-y-3 text-base text-cream/90">
                {[
                  "Everything in Butler",
                  "Invite the people who love you — as many as you want",
                  "More room for Butler to remember",
                  "14 days free to try it",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sun" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/app"
                className="magnetic mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sun px-6 py-4 text-sm font-semibold text-ink transition hover:bg-cream"
              >
                Try Butler Pro free for 14 days
              </a>
            </div>
          </div>

          <p className="reveal mt-10 text-center text-sm text-ink/60">
            Reminders are never paywalled. The important things stay the same
            on every plan. That&rsquo;s a promise.
          </p>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="big-cta relative overflow-hidden py-40 md:py-52">
        <Squiggle className="top-20 left-[15%]" color="#9A86B8" path="M2,40 Q60,10 120,40 T240,40" width={260} height={80} />
        <Squiggle className="bottom-20 right-[10%]" color="#B99FD4" path="M2,40 C40,10 80,70 140,30 S260,60 320,20" width={340} height={80} />
        <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
          <div className="big-wordmark">
            <h2 className="font-chunky text-[clamp(3rem,12vw,12rem)] font-bold leading-[0.85] tracking-tightest text-ink">
              Let Butler <br />
              <span className="font-display italic font-normal">remember.</span>
            </h2>
          </div>
          <p className="mx-auto mt-10 max-w-xl text-lg text-ink/70">
            Two minutes to set up. Nothing to install. Your Butler is waiting.
          </p>
          <a
            href="/app"
            className="magnetic mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-10 py-6 text-lg font-semibold text-white shadow-[0_30px_60px_-30px_rgba(22,15,34,0.5)] transition hover:bg-ink-soft"
          >
            Open Butler
            <span>→</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-ink/10 bg-lavender-50 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-center md:px-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-ink text-sun grid place-items-center font-display text-2xl italic">
              B
            </div>
            <div>
              <div className="font-chunky text-xl font-bold text-ink">Butler</div>
              <div className="text-xs text-ink/50">mybutler.pro</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-ink/70 md:grid-cols-3">
            <a href="#story" className="hover:text-ink">The story</a>
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#together" className="hover:text-ink">Together</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="mailto:hello@mybutler.pro" className="hover:text-ink">Say hello</a>
            <a href="#" className="hover:text-ink">Privacy</a>
          </div>
          <div className="text-xs text-ink/50">
            Made with care by Rabbithole. <br />© {new Date().getFullYear()} Butler.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .nav-scrolled > div {
          padding-top: 1rem;
          padding-bottom: 1rem;
          background: rgba(247, 242, 251, 0.82);
          backdrop-filter: saturate(1.2) blur(12px);
          border-bottom: 1px solid rgba(22, 15, 34, 0.08);
          border-radius: 0;
        }
      `}</style>
    </div>
  );
}

/* ---------- Components ---------- */

function FeatureCard({
  bg,
  tag,
  title,
  body,
  icon,
  dark = false,
}: {
  bg: string;
  tag: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`feature-card card-shadow relative overflow-hidden rounded-[28px] p-8 ${bg}`}>
      <div className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-cream/60" : "text-ink/50"}`}>
        {tag}
      </div>
      <div className="my-6 h-16 w-16">{icon}</div>
      <h3 className={`font-chunky text-2xl font-bold leading-tight ${dark ? "text-cream" : "text-ink"}`}>
        {title}
      </h3>
      <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-cream/75" : "text-ink/70"}`}>
        {body}
      </p>
    </div>
  );
}

function PhoneMockup({ tone = "default" }: { tone?: "default" | "tato" | "daughter" }) {
  const isTato = tone === "tato";
  const isDaughter = tone === "daughter";
  return (
    <div className="relative">
      <div className="card-shadow relative rounded-[44px] border-[10px] border-ink bg-white p-4 w-[260px] md:w-[280px]">
        {/* notch */}
        <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-ink" />
        {/* status line */}
        <div className="mb-5 flex items-center justify-between px-2 text-[10px] font-semibold text-ink/60">
          <span>9:41</span>
          <span>●●●</span>
        </div>

        <div className="px-1">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink/45">
            {isDaughter ? "For Dad" : "Today"}
          </div>
          <div className="mt-1 font-chunky text-2xl font-bold leading-tight text-ink">
            {isDaughter ? "Dad has 3 things" : "Hi, " + (isTato ? "Tato" : "friend") + " ✦"}
          </div>
          <div className="text-xs text-ink/60">
            {isDaughter ? "He&rsquo;s doing great today." : "Three small things today."}
          </div>
        </div>

        <div className="mt-5 space-y-3 px-1">
          <ReminderRow color="bg-mint" time="10:00" title="Morning pills" sub="With water. You&rsquo;ve got this." />
          <ReminderRow color="bg-cream" time="2:30" title="Dr. Reyes — checkup" sub="Bring the blue folder." />
          <ReminderRow color="bg-blush" time="6:15" title="Call your daughter" sub="It&rsquo;s her Tuesday." />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-full bg-ink px-4 py-3">
          <span className="text-xs font-semibold text-cream">
            {isDaughter ? "All quiet — Butler&rsquo;s got it" : "Butler&rsquo;s got you"}
          </span>
          <span className="text-sun">✦</span>
        </div>
      </div>
    </div>
  );
}

function ReminderRow({ color, time, title, sub }: { color: string; time: string; title: string; sub: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3 ${color}`}>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[10px] font-bold text-ink">
        {time}
      </div>
      <div className="min-w-0">
        <div className="truncate font-chunky text-sm font-bold text-ink">{title}</div>
        <div className="truncate text-[11px] text-ink/60" dangerouslySetInnerHTML={{ __html: sub }} />
      </div>
    </div>
  );
}

function PortraitIllustration() {
  return (
    <svg viewBox="0 0 260 280" className="w-full">
      {/* background blob */}
      <path
        d="M30,60 Q130,-20 220,40 Q280,140 210,230 Q120,290 40,220 Q-20,150 30,60 Z"
        fill="#EFE6F6"
      />
      {/* hair/cap */}
      <path
        d="M80,90 Q130,40 190,90 Q200,110 180,118 L90,118 Q70,110 80,90 Z"
        fill="#2A1F3D"
      />
      {/* face */}
      <ellipse cx="135" cy="150" rx="62" ry="72" fill="#F5DEB8" stroke="#2A1F3D" strokeWidth="3" />
      {/* glasses */}
      <circle cx="112" cy="148" r="14" fill="none" stroke="#2A1F3D" strokeWidth="3" />
      <circle cx="158" cy="148" r="14" fill="none" stroke="#2A1F3D" strokeWidth="3" />
      <line x1="126" y1="148" x2="144" y2="148" stroke="#2A1F3D" strokeWidth="3" />
      {/* nose */}
      <path d="M135,155 Q132,170 140,175" stroke="#2A1F3D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* smile */}
      <path d="M118,188 Q135,200 152,188" stroke="#2A1F3D" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* mustache */}
      <path d="M112,180 Q135,186 158,180" stroke="#2A1F3D" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* shirt */}
      <path d="M60,240 Q135,200 210,240 L210,280 L60,280 Z" fill="#CFE5D3" stroke="#2A1F3D" strokeWidth="3" />
      {/* sparkle */}
      <path d="M215,80 L218,90 L228,93 L218,96 L215,106 L212,96 L202,93 L212,90 Z" fill="#F5C842" />
      <path d="M40,170 L42,178 L50,180 L42,182 L40,190 L38,182 L30,180 L38,178 Z" fill="#F5C842" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M20,14 Q10,14 10,24 Q2,30 10,38 Q8,50 22,50 Q26,58 32,52 Q38,58 42,50 Q56,50 54,38 Q62,30 54,24 Q54,14 44,14 Q38,8 32,14 Q26,8 20,14 Z"
        fill="none"
        stroke="#160F22"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M32,14 L32,52 M22,26 Q32,30 42,26 M22,40 Q32,44 42,40" stroke="#160F22" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M12,46 Q32,46 52,46 L46,30 Q46,14 32,12 Q18,14 18,30 Z"
        fill="none"
        stroke="#160F22"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M26,52 Q32,58 38,52" stroke="#160F22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="8" r="3" fill="#160F22" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M32,54 Q8,38 8,22 Q8,10 20,10 Q28,10 32,20 Q36,10 44,10 Q56,10 56,22 Q56,38 32,54 Z"
        fill="none"
        stroke="#160F22"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon({ color = "#160F22" }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <path
        d="M12,52 Q10,18 52,12 Q56,42 22,54 Q16,56 12,52 Z"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M12,52 Q28,38 48,18" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
