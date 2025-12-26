import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import clsx from 'clsx'
import { useI18n } from './i18n/i18n'
import { DotNav } from './components/DotNav'
import { IPhoneMock } from './components/IPhoneMock'
import { CountdownTicker } from './components/Countdown'
import { Magnetic } from './components/Magnetic'
import { Reveal } from './components/Reveal'
import { LanguagePicker } from './components/LanguagePicker'
import { WaitlistForm } from './components/WaitlistForm'
import { LAUNCH_AT, formatLaunchInfo } from './config/launch'
import { ThankYouModal } from './components/ThankYouModal'
import { DemoCalendar } from './components/DemoCalendar'
import { PriceCard } from './components/PriceCard'
import { IntroOverlay } from './components/IntroOverlay'
import appIcon from './assets/app_icon_square.png'

function App() {
  const { t, ta, lang } = useI18n()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeId, setActiveId] = useState('hero')
  const [thankOpen, setThankOpen] = useState(false)
  const [introOpen, setIntroOpen] = useState(true)
  const prefersReduceMotion = useReducedMotion()
  const reduceMotion = !!prefersReduceMotion

  useEffect(() => {
    if (!introOpen) return
    const id = window.setTimeout(() => setIntroOpen(false), 3000)
    return () => window.clearTimeout(id)
  }, [introOpen])

  const items = useMemo(
    () => [
      { id: 'hero', label: t('nav.hero') },
      { id: 'pre', label: t('nav.pre') },
      { id: 'trust', label: t('nav.trust') },
      { id: 'experience', label: t('nav.experience') },
      { id: 'partner', label: t('nav.partner') },
      { id: 'faq', label: t('nav.faq') },
    ],
    [t]
  )

  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const sections = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean) as HTMLElement[]

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (best?.target?.id) setActiveId(best.target.id)
      },
      { root, threshold: [0.35, 0.5, 0.65] }
    )

    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const launch = useMemo(() => LAUNCH_AT, [])
  const launchMeta = useMemo(() => formatLaunchInfo(lang, t('hero.launch')), [lang, t])
  const faqItems = useMemo(
    () =>
      ta('faq.items')
        .map((s) => {
          const [q, ...rest] = s.split('::')
          return { q: q?.trim(), a: rest.join('::').trim() }
        })
        .filter((i) => i.q && i.a),
    [ta]
  )

  const EASE_STD: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const EASE_CARDS: [number, number, number, number] = [0.33, 1, 0.68, 1]
  const sectionVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_STD } } }
  const trustCardVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_CARDS } } }

  return (
    <div ref={containerRef} className="no-scrollbar h-screen w-full overflow-y-auto snap-y snap-mandatory">
      <IntroOverlay open={introOpen} onDone={() => setIntroOpen(false)} reduceMotion={reduceMotion} />
      <DotNav items={items} activeId={activeId} onSelect={scrollTo} />

      {/* Section 1: Hero */}
      <section id="hero" className="relative flex min-h-[90vh] snap-start items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={sectionVariants}
        >
          <div className="rounded-3xl border border-black/5 bg-white/75 p-8 shadow-quiet-xl backdrop-blur md:p-12">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <motion.div
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]"
                  whileInView={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[10px] font-extrabold text-slate-900">
                    ✦
                  </span>
                  {t('hero.labelOverview')}
                </motion.div>
                <motion.div
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]"
                  whileInView={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[10px] font-extrabold text-slate-900">
                    ✨
                  </span>
                  {t('hero.labelSlogan')}
                </motion.div>
              </div>
            <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 items-start">
            <div className="max-w-xl lg:max-w-[520px] z-10">
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/70 px-3 py-2 text-xs font-semibold tracking-tight text-slate-600 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.35)] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                  {t('hero.note')}
                </div>
                <LanguagePicker />
              </div>

              <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-slate-900 leading-[1.1] whitespace-normal sm:text-4xl md:text-5xl lg:text-6xl">
                <Reveal>{t('hero.headline')}</Reveal>
              </h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                <Reveal delay={0.08}>{t('hero.subcopy')}</Reveal>
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  t('trust.badges.verified'),
                  t('trust.badges.pricing'),
                  t('trust.badges.reviews'),
                  t('trust.badges.support'),
                ].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-2 rounded-xl border border-black/5 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.35)] backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid w-full max-w-xl gap-2 text-xs font-semibold text-slate-600 sm:grid-cols-3">
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2 shadow-[0_10px_28px_-26px_rgba(0,0,0,0.35)] backdrop-blur text-xs sm:text-sm">
                  {t('hero.stats.citiesTitle')}
                  <div className="text-xs font-medium text-slate-500">{t('hero.stats.citiesDesc')}</div>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2 shadow-[0_10px_28px_-26px_rgba(0,0,0,0.35)] backdrop-blur text-xs sm:text-sm">
                  {t('hero.stats.languagesTitle')}
                  <div className="text-xs font-medium text-slate-500">{t('hero.stats.languagesDesc')}</div>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2 shadow-[0_10px_28px_-26px_rgba(0,0,0,0.35)] backdrop-blur text-xs sm:text-sm">
                  {t('hero.stats.missionTitle')}
                  <div className="text-xs font-medium text-slate-500">{t('hero.stats.missionDesc')}</div>
                </div>
              </div>

              <div className="mt-7 sm:mt-9 w-full max-w-xl space-y-3">
                <WaitlistForm source="hero" onSuccess={() => setThankOpen(true)} />
                <div className="text-xs font-medium text-slate-500 leading-relaxed">{launchMeta.headline}</div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  {t('hero.stats.chips')
                    .split('|')
                    .filter(Boolean)
                    .map((chip, idx) => (
                      <span key={idx} className="rounded-full bg-black/5 px-3 py-1 leading-tight">
                        {chip}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-xl lg:max-w-[460px] lg:justify-self-end z-0 mt-6 lg:mt-0">
              <div className="relative">
                <div className="absolute -left-6 -top-6 hidden h-16 w-16 rounded-2xl bg-[linear-gradient(135deg,rgba(249,180,201,0.35),rgba(182,230,216,0.3),rgba(185,183,245,0.35))] blur-2xl lg:block" />
                <IPhoneMock className="animate-float-soft max-w-[320px] sm:max-w-[360px] lg:max-w-none mx-auto" />
              </div>
              <Magnetic className="mt-6" strength={10}>
                <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/75 p-5 shadow-[0_28px_80px_-50px_rgba(17,24,39,0.55)] backdrop-blur">
                  <div className="pointer-events-none absolute inset-0 opacity-20 blur-2xl bg-[radial-gradient(60%_60%_at_30%_20%,#F9B4C9,transparent),radial-gradient(55%_55%_at_80%_40%,#B6E6D8,transparent),radial-gradient(60%_60%_at_50%_90%,#B9B7F5,transparent)]" />
                  <CountdownTicker
                    target={launch}
                    title={launchMeta.title}
                    labels={{
                      days: t('countdown.days'),
                      hours: t('countdown.hours'),
                      minutes: t('countdown.minutes'),
                      seconds: t('countdown.seconds'),
                    }}
                    tzLabel={launchMeta.tzLabel ?? t('countdown.tzLabel')}
                  />
                </div>
              </Magnetic>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
              Scroll to explore
              <span className="animate-bounce text-slate-500">↓</span>
            </div>
          </div>
          </div>
        </motion.div>
      </section>

      {/* Split Pre-registration: Traveler / Partner */}
      <section id="pre" className="relative flex min-h-[50vh] snap-start items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-quiet-md backdrop-blur"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                {t('hero.labelOverview')}
              </div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                {t('waitlist.submit')}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600">{t('hero.subcopy')}</div>
              <div className="mt-4">
                <WaitlistForm source="traveler-split" onSuccess={() => setThankOpen(true)} />
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-black/5 bg-white/80 p-6 shadow-quiet-md backdrop-blur"
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                {t('partner.label')}
              </div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                {t('partner.cta')}
              </div>
              <div className="mt-1 text-sm font-medium text-slate-600">{t('partner.body')}</div>
              <div className="mt-4">
                <WaitlistForm source="partner-split" onSuccess={() => setThankOpen(true)} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 1.5: Two Layout Previews */}
      <section id="layouts" className="relative flex snap-start items-center py-4 sm:py-8">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              className="rounded-2xl border border-black/5 bg-[linear-gradient(135deg,rgba(249,180,201,0.12),rgba(182,230,216,0.12),rgba(185,183,245,0.12))] p-6 shadow-[0_24px_65px_-48px_rgba(17,24,39,0.5)] backdrop-blur"
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-semibold text-slate-600">{t('hero.labelOverview')}</div>
              <div className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Traveler View
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600 line-clamp-2">{t('hero.subcopy')}</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                {t('hero.stats.citiesTitle')}
              </div>
              <button
                onClick={() => scrollTo('hero')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-quiet-md hover:bg-slate-800"
              >
                {t('waitlist.submit')}
              </button>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-black/5 bg-[linear-gradient(135deg,rgba(185,183,245,0.12),rgba(182,230,216,0.12),rgba(249,180,201,0.12))] p-6 shadow-[0_24px_65px_-48px_rgba(17,24,39,0.5)] backdrop-blur"
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs font-semibold text-slate-600">{t('partner.label')}</div>
              <div className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Partner View
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600 line-clamp-2">{t('partner.body')}</p>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                {t('partner.points.intentTitle')}
      </div>
              <button
                onClick={() => scrollTo('partner')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-extrabold text-white shadow-quiet-md hover:bg-slate-800"
              >
                {t('partner.cta')}
        </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Trust & Verified */}
      <section id="trust" className="relative flex min-h-[90vh] snap-start items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
            <div className="rounded-3xl border border-black/5 bg-white/75 p-8 shadow-quiet-xl backdrop-blur md:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
              Trust · Verified
          </div>
            <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                <Reveal>{t('trust.title')}</Reveal>
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                <Reveal delay={0.06}>{t('trust.body')}</Reveal>
        </p>
      </div>

          <motion.div
            className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
          >
            <motion.div variants={trustCardVariants}>
            <TrustBadge reduceMotion={reduceMotion} title={t('trust.badges.verified')} desc={t('trust.badgeCopy.verified')} />
            </motion.div>
            <motion.div variants={trustCardVariants}>
            <TrustBadge reduceMotion={reduceMotion} title={t('trust.badges.pricing')} desc={t('trust.badgeCopy.pricing')} />
            </motion.div>
            <motion.div variants={trustCardVariants}>
            <TrustBadge reduceMotion={reduceMotion} title={t('trust.badges.reviews')} desc={t('trust.badgeCopy.reviews')} />
            </motion.div>
            <motion.div variants={trustCardVariants}>
            <TrustBadge reduceMotion={reduceMotion} title={t('trust.badges.support')} desc={t('trust.badgeCopy.support')} />
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Seamless Experience */}
      <section id="experience" className="relative flex min-h-[90vh] snap-start items-center overflow-hidden">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
            <div className="rounded-3xl border border-black/5 bg-white/75 p-8 shadow-quiet-xl backdrop-blur md:p-12">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]"
              whileInView={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[10px] font-extrabold text-slate-900">
                ✦
              </span>
              Experience · 3 Promises
            </motion.div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              <Reveal>{t('experience.title')}</Reveal>
            </h2>

          <div className="mt-8 sm:mt-10 space-y-6">
            <ZigZag
              flip={false}
              title={t('experience.cards.verified.title')}
              body={t('experience.cards.verified.body')}
              points={ta('experience.cards.verified.points')}
              tone="pink"
              reduceMotion={reduceMotion}
            />
            <ZigZag
              flip
              title={t('experience.cards.transparent.title')}
              body={t('experience.cards.transparent.body')}
              points={ta('experience.cards.transparent.points')}
              tone="mint"
              reduceMotion={reduceMotion}
            />
            <ZigZag
              flip={false}
              title={t('experience.cards.seamless.title')}
              body={t('experience.cards.seamless.body')}
              points={ta('experience.cards.seamless.points')}
              tone="lavender"
              reduceMotion={reduceMotion}
            />
          </div>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Partner */}
      <section id="partner" className="relative flex min-h-[90vh] snap-start items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <div className="rounded-3xl border border-black/5 bg-white/75 p-8 shadow-quiet-xl backdrop-blur md:p-12">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]"
              whileInView={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[10px] font-extrabold text-slate-900">
                ✔
              </span>
              {t('partner.label')}
            </motion.div>
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                    <Reveal>{t('partner.title')}</Reveal>
                  </h2>
                  <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                    <Reveal delay={0.06}>{t('partner.body')}</Reveal>
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3 text-[11px] font-semibold text-slate-600">
                    <div className="rounded-xl border border-black/5 bg-white/80 px-3 py-2 shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)] backdrop-blur">
                      {t('partner.points.intentTitle')}
                      <div className="text-[10px] font-medium text-slate-500">{t('partner.points.intentDesc')}</div>
                    </div>
                    <div className="rounded-xl border border-black/5 bg-white/80 px-3 py-2 shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)] backdrop-blur">
                      {t('partner.points.opsTitle')}
                      <div className="text-[10px] font-medium text-slate-500">{t('partner.points.opsDesc')}</div>
                    </div>
                    <div className="rounded-xl border border-black/5 bg-white/80 px-3 py-2 shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)] backdrop-blur">
                      {t('partner.points.crossTitle')}
                      <div className="text-[10px] font-medium text-slate-500">{t('partner.points.crossDesc')}</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <DemoCalendar title={t('partner.calendar.title')} subtitle={t('partner.calendar.subtitle')} />
                  <PriceCard
                    title={t('partner.pricingDemo')}
                    accent="lavender"
                    items={[
                      { title: 'Hair Spa', desc: '60 min · Seat guarantee', price: '$78', tag: 'Popular' },
                      { title: 'Nail Art', desc: 'Classic gel · top tier', price: '$65' },
                      { title: 'Makeup', desc: 'Event-ready · stylist pick', price: '$120' },
                    ]}
                    footer={t('partner.priceFooter')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-black/5 bg-white/80 p-5 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.35)] backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-xl border border-black/5 bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                  {t('partner.cta')}
                </div>
                <div className="text-sm font-medium leading-relaxed text-slate-600">{t('waitlist.privacy')}</div>
                <WaitlistForm source="partner" onSuccess={() => setThankOpen(true)} />
                <div className="flex items-center gap-3 rounded-xl border border-black/5 bg-white/70 px-3 py-2 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.35)] backdrop-blur">
                  <img src={appIcon} alt="BEAUTIA icon" className="h-10 w-10 rounded-lg border border-black/5" />
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{t('footer.partnerTitle')}</div>
                    <div className="text-[11px] font-medium text-slate-600">{t('footer.partnerDesc')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative flex min-h-[40vh] snap-start items-center">
        <motion.div
          className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-[0_12px_32px_-28px_rgba(0,0,0,0.35)]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[10px] font-extrabold text-slate-900">
              ?
            </span>
            {t('faq.title')}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl border border-black/5 bg-white/80 p-5 shadow-quiet-md backdrop-blur"
                initial={reduceMotion ? undefined : { y: 12, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.01 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-slate-900">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-[11px] font-extrabold text-slate-900">
                    Q
                  </span>
                  <span className="text-balance">{item.q}</span>
                </div>
                <div className="mt-3 rounded-xl border border-black/5 bg-white/80 px-3 py-2 text-sm font-medium leading-relaxed text-slate-600 text-balance sm:text-base shadow-[0_12px_30px_-26px_rgba(0,0,0,0.35)]">
                  {item.a}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <ThankYouModal
        open={thankOpen}
        onClose={() => setThankOpen(false)}
        title={t('waitlist.success')}
        body={t('waitlist.privacy')}
      />
      <footer className="py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6">
          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex items-center gap-3 px-1">
              <img src={appIcon} alt="BEAUTIA icon" className="h-12 w-12 rounded-lg border border-black/5 bg-white/70 shadow-[0_10px_28px_-22px_rgba(0,0,0,0.35)]" />
              <div className="text-left">
                <div className="text-sm font-extrabold text-slate-900">{t('footer.partnerTitle')}</div>
                <div className="text-[11px] font-medium text-slate-600">{t('footer.partnerDesc')}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
                ✦ Glow Up Anywhere in Asia
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
                ✓ Verified · Transparent · Seamless
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1">
                Launch · Feb 10, 10:00 KST
              </span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-black/5" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500">
            <span>{t('footer.line')}</span>
            <div className="flex gap-2 text-[11px] font-semibold text-slate-600">
              <span className="rounded-full bg-black/5 px-2 py-[2px]">KO / EN / JP / CN / TH</span>
              <span className="rounded-full bg-black/5 px-2 py-[2px]">Beauty · Travel · Premium Calm</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TrustBadge({ title, desc, reduceMotion }: { title: string; desc: string; reduceMotion: boolean }) {
  return (
    <motion.div
      className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-[0_18px_55px_-45px_rgba(17,24,39,0.35)] backdrop-blur"
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(90deg,rgba(249,180,201,0.55),rgba(182,230,216,0.55),rgba(185,183,245,0.55))]">
          <span className="text-sm font-extrabold tracking-tight text-slate-900">✓</span>
        </div>
        <div className="text-sm font-extrabold tracking-tight text-slate-900">{title}</div>
      </div>
      <div className="mt-3 h-[1px] w-full bg-black/5" />
      <div className="mt-3 text-xs font-medium leading-relaxed text-slate-600">{desc}</div>
    </motion.div>
  )
}

function ZigZag({
  title,
  body,
  points,
  flip,
  tone,
  reduceMotion,
}: {
  title: string
  body: string
  points?: string[]
  flip: boolean
  tone: 'pink' | 'mint' | 'lavender'
  reduceMotion: boolean
}) {
  const toneBg =
    tone === 'pink'
      ? 'from-[rgba(249,180,201,0.55)] via-white to-[rgba(249,180,201,0.25)]'
      : tone === 'mint'
        ? 'from-[rgba(182,230,216,0.55)] via-white to-[rgba(182,230,216,0.25)]'
        : 'from-[rgba(185,183,245,0.55)] via-white to-[rgba(185,183,245,0.25)]'
  const POINT_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1]
  const pointVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: POINT_EASE } },
      }

  return (
    <div
      className={clsx(
        'grid gap-5 rounded-2xl border border-black/5 bg-white/70 p-6 shadow-quiet-md backdrop-blur md:grid-cols-2 md:items-center',
        'w-full max-w-full overflow-hidden',
        'mx-auto max-w-[520px] lg:max-w-none',
        flip && 'md:[&>*:first-child]:order-2'
      )}
    >
      <div>
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</div>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">{body}</p>
        {points?.length ? (
          <motion.div
            className="mt-4 flex flex-wrap gap-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: reduceMotion ? 0 : 0.05 }}
          >
            {points.map((p, i) => (
              <motion.span
                key={i}
                variants={pointVariants}
                className="inline-flex items-center gap-2 rounded-xl bg-black/5 px-3 py-1 text-xs font-semibold text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                {p}
              </motion.span>
            ))}
          </motion.div>
        ) : null}
      </div>
      <div className="relative w-full max-w-full lg:max-w-none mx-auto">
        <motion.div
          className={clsx(
            'aspect-[4/3] sm:aspect-[16/10] w-full max-w-full overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br shadow-[0_24px_70px_-60px_rgba(17,24,39,0.55)]',
            'mx-auto max-w-[90vw] sm:max-w-[620px]',
            toneBg
          )}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={reduceMotion ? undefined : { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 opacity-35 blur-[80px] bg-[radial-gradient(50%_60%_at_40%_30%,rgba(255,255,255,0.9),transparent)]" />
            <div className="relative h-full w-full p-3 sm:p-5">
              <div className="flex gap-2 sm:gap-3 justify-center items-start">
                <motion.div
                  className="flex-1 space-y-2"
                  initial={reduceMotion ? undefined : { y: 12, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className="h-8 w-28 rounded-2xl bg-white/85" />
                  <div className="h-3 w-44 rounded-full bg-white/80" />
                  <div className="h-3 w-36 rounded-full bg-white/70" />
                  <motion.div
                    className="grid grid-cols-3 gap-3 pt-4"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        variants={
                          reduceMotion
                            ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
                            : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } } }
                        }
                        className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-white/50 bg-white/80 p-2 shadow-[0_14px_36px_-30px_rgba(0,0,0,0.45)]"
                      >
                        <div className="h-3 w-12 rounded-full bg-slate-200/90" />
                        <div className="space-y-1 text-[10px] font-semibold text-slate-600">
                          <div className="h-2.5 w-14 rounded-full bg-slate-200/80" />
                          <div className="h-2.5 w-10 rounded-full bg-slate-200/70" />
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] px-2 py-[2px] text-[10px] font-bold text-slate-900">
                          ¥8,900
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="w-36 space-y-2 rounded-2xl border border-white/60 bg-white/85 p-3 text-[11px] font-semibold text-slate-700 shadow-[0_16px_42px_-34px_rgba(0,0,0,0.45)]"
                  initial={reduceMotion ? undefined : { y: 16, opacity: 0 }}
                  whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: 0.05 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-2 py-[2px] text-[10px]">
                    ✓ Verified
                  </div>
                  <div className="text-slate-900">Transparent menu</div>
                  <div className="text-[10px] font-medium text-slate-500">Price · Time · Policy</div>
                  <div className="mt-2 rounded-xl border border-slate-100 bg-white/90 px-2 py-2">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700">
                      <span>Hair Spa</span>
                      <span className="rounded-full bg-black/5 px-2 py-[1px] text-[9px]">60m</span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-slate-900">¥8,900</div>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-white/90 px-2 py-2">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700">
                      <span>Makeup</span>
                      <span className="rounded-full bg-black/5 px-2 py-[1px] text-[9px]">90m</span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold text-slate-900">¥12,000</div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-[0_10px_30px_-26px_rgba(0,0,0,0.35)]"
                initial={reduceMotion ? undefined : { y: -8, opacity: 0 }}
                whileInView={reduceMotion ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              >
                <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                Real-time slots · Chat
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
