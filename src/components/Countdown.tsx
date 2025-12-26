import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

function clamp(n: number) {
  return n < 0 ? 0 : n
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return useMemo(() => {
    const diff = clamp(target.getTime() - now)
    const totalSec = Math.floor(diff / 1000)
    const days = Math.floor(totalSec / 86400)
    const hours = Math.floor((totalSec % 86400) / 3600)
    const minutes = Math.floor((totalSec % 3600) / 60)
    const seconds = totalSec % 60
    return { days, hours, minutes, seconds }
  }, [now, target])
}

function DigitRoll({ digit }: { digit: number }) {
  return (
    <div className="relative h-[1em] w-[0.62em] overflow-hidden tabular-nums">
      <motion.div
        className="absolute left-0 top-0"
        animate={{ y: `-${digit}em` }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-[1em] leading-none">
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function RollingNumber({ value, minDigits = 2 }: { value: number; minDigits?: number }) {
  const str = String(Math.max(0, Math.floor(value))).padStart(minDigits, '0')
  return (
    <div className="flex items-baseline">
      {Array.from(str).map((ch, idx) => {
        const d = Number(ch)
        return Number.isFinite(d) ? (
          <DigitRoll key={idx} digit={d} />
        ) : (
          <div key={idx} className="h-[1em] w-[0.62em] leading-none">
            {ch}
          </div>
        )
      })}
    </div>
  )
}

function UnitCard({
  label,
  value,
  wide,
  minDigits,
}: {
  label: string
  value: number
  wide?: boolean
  minDigits?: number
}) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-black/5 bg-white/70 px-4 py-3 shadow-quiet-md backdrop-blur',
        wide ? 'min-w-[122px]' : 'min-w-[96px]'
      )}
    >
      <div className="text-[11px] font-medium tracking-tight text-slate-500">{label}</div>
      <div className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
        <RollingNumber value={value} minDigits={minDigits} />
      </div>
    </div>
  )
}

export function CountdownTicker({
  target,
  title,
  labels,
  tzLabel,
  className,
}: {
  target: Date
  title: string
  labels: { days: string; hours: string; minutes: string; seconds: string }
  tzLabel?: string
  className?: string
}) {
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <div className={clsx('w-full', className)}>
      <div className="mb-3 text-xs font-semibold tracking-tight text-slate-500">{title}</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <UnitCard label={labels.days} value={days} wide minDigits={Math.max(2, String(days).length)} />
        <UnitCard label={labels.hours} value={hours} minDigits={2} />
        <UnitCard label={labels.minutes} value={minutes} minDigits={2} />
        <UnitCard label={labels.seconds} value={seconds} minDigits={2} />
      </div>
      {tzLabel ? <div className="mt-2 text-[11px] font-medium text-slate-500">{tzLabel}</div> : null}
    </div>
  )
}

