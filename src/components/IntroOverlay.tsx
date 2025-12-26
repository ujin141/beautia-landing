import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import appIcon from '../assets/app_icon_square.png'
import { LAUNCH_AT } from '../config/launch'

type Props = { open: boolean; onDone: () => void; reduceMotion?: boolean }

const sloganWords = ['Glow', 'Up', 'Anywhere', 'in', 'Asia']

export function IntroOverlay({ open, onDone, reduceMotion }: Props) {
  useEffect(() => {
    if (!open) return
    if (reduceMotion) {
      onDone()
      return
    }
    const id = window.setTimeout(() => onDone(), 2500)
    return () => window.clearTimeout(id)
  }, [open, onDone, reduceMotion])

  if (reduceMotion && open) return null

  const countdown = useMemo(() => {
    const diff = Math.max(LAUNCH_AT.getTime() - Date.now(), 0)
    const days = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return { days, hours, minutes }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80] overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(249,180,201,0.28),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(182,230,216,0.28),transparent_55%),radial-gradient(circle_at_60%_70%,rgba(185,183,245,0.32),transparent_60%),#ffffff]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 1.9, duration: 0.6, ease: 'easeInOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onAnimationComplete={() => onDone()}
        >
          <motion.div
            className="absolute inset-0 opacity-25 blur-3xl bg-[radial-gradient(40%_35%_at_20%_25%,#F9B4C9,transparent),radial-gradient(40%_35%_at_75%_30%,#B6E6D8,transparent),radial-gradient(40%_35%_at_55%_75%,#B9B7F5,transparent)]"
            animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.22, 0.28, 0.22] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
          />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="relative flex w-full max-w-[420px] flex-col items-center gap-3 overflow-hidden rounded-[24px] border border-black/10 bg-white/85 px-6 py-5 shadow-[0_32px_90px_-55px_rgba(17,24,39,0.5)] backdrop-blur sm:max-w-[480px] sm:rounded-[28px] sm:px-8 sm:py-6">
              <div className="absolute -inset-5 sm:-inset-6 rounded-[32px] opacity-25 blur-[50px] sm:blur-[60px] bg-[radial-gradient(circle_at_30%_30%,#F9B4C9,transparent_55%),radial-gradient(circle_at_70%_30%,#B6E6D8,transparent_55%),radial-gradient(circle_at_60%_70%,#B9B7F5,transparent_65%)]" />
              <motion.div
                className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-[0_18px_46px_-34px_rgba(0,0,0,0.35)] sm:h-20 sm:w-20"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              >
                <img
                  src={appIcon}
                  alt="BEAUTIA logo"
                  className="h-12 w-12 rounded-2xl border border-black/5 shadow-[0_18px_42px_-30px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.05)]"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.05, opacity: 1 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
              </motion.div>
              <motion.div
                className="relative text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
                initial={{ y: '120%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              >
                BEAUTIA
              </motion.div>
              <div className="relative flex flex-wrap justify-center gap-1 text-xs font-semibold tracking-tight text-slate-600 sm:text-sm">
                {sloganWords.map((w, i) => (
                  <motion.span
                    key={w + i}
                    initial={{ y: 12, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.15 + i * 0.2,
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="relative text-[11px] font-semibold text-slate-500"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.22 + sloganWords.length * 0.2 }}
              >
                Launch · Feb 10, 10:00 KST
              </motion.div>
              <motion.div
                className="relative mt-2 rounded-2xl border border-white/50 bg-white/70 px-4 py-3 text-[11px] font-semibold text-slate-700 shadow-[0_18px_48px_-36px_rgba(0,0,0,0.45)] backdrop-blur"
                initial={reduceMotion ? undefined : { y: 14, opacity: 0, scale: 0.96 }}
                animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.35 + sloganWords.length * 0.2,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                  Artistic countdown
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-black/5 bg-white/60 px-2 py-1">
                    <div className="text-lg font-extrabold text-slate-900">{String(Math.min(99, countdown.days)).padStart(2, '0')}</div>
                    <div className="text-[10px] font-semibold text-slate-500">DAYS</div>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/60 px-2 py-1">
                    <div className="text-lg font-extrabold text-slate-900">{String(countdown.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] font-semibold text-slate-500">HRS</div>
                  </div>
                  <div className="rounded-xl border border-black/5 bg-white/60 px-2 py-1">
                    <div className="text-lg font-extrabold text-slate-900">{String(countdown.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] font-semibold text-slate-500">MIN</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-x-8 bottom-0 h-[3px] bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.25 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


