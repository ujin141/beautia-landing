import { useMemo, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Magnetic } from './Magnetic'
import clsx from 'clsx'
import { useI18n } from '../i18n/i18n'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined
const directEndpoint = import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined

function resolveEndpoint() {
  if (directEndpoint) return directEndpoint
  if (formspreeId) return `https://formspree.io/f/${formspreeId}`
  return null
}

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value)
}

export function WaitlistForm({
  className,
  source,
  onSuccess,
  onError,
}: {
  className?: string
  source?: string
  onSuccess?: () => void
  onError?: () => void
}) {
  const { t, lang } = useI18n()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const endpoint = useMemo(() => resolveEndpoint(), [])
  const disabled = status === 'submitting' || status === 'success' || !endpoint

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!endpoint) return
    if (!isEmail(email)) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          lang,
          ts: new Date().toISOString(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        onSuccess?.()
      } else {
        setStatus('error')
        onError?.()
      }
    } catch {
      setStatus('error')
      onError?.()
    }
  }

  return (
    <div
      className={clsx(
        'rounded-2xl border border-black/5 bg-white/80 p-5 shadow-quiet-md backdrop-blur',
        className
      )}
    >
      <div className="text-sm font-extrabold tracking-tight text-slate-900">
        {t('waitlist.submit')}
      </div>
      <p className="mt-1 text-[11px] font-medium text-slate-500">{t('waitlist.privacy')}</p>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <label className="text-xs font-semibold text-slate-600" htmlFor={`email-${source ?? 'waitlist'}`}>
          {t('waitlist.emailLabel')}
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] transition-all duration-150 focus-within:-translate-y-[1px] focus-within:border-slate-300 focus-within:shadow-[0_16px_40px_-28px_rgba(0,0,0,0.35)]">
          <span className="text-slate-400">@</span>
          <input
            id={`email-${source ?? 'waitlist'}`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('waitlist.emailPlaceholder')}
            aria-invalid={status === 'error'}
            className="h-9 w-full border-0 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>

        <Magnetic strength={8} disabled={!endpoint}>
          <motion.button
            type="submit"
            disabled={disabled}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              'flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-extrabold tracking-tight text-white shadow-quiet-md transition-all duration-200',
              disabled
                ? 'bg-slate-400'
                : 'bg-slate-900 hover:bg-slate-800 hover:-translate-y-[1px] hover:shadow-[0_18px_40px_-30px_rgba(0,0,0,0.45)]'
            )}
          >
            {status === 'submitting' ? t('waitlist.submitting') : t('waitlist.submit')}
          </motion.button>
        </Magnetic>

        <div aria-live="polite" className="min-h-[1.25rem] text-xs font-semibold">
          {status === 'success' && <span className="text-emerald-600">{t('waitlist.success')}</span>}
          {status === 'error' && <span className="text-rose-600">{t('waitlist.sendFailed')}</span>}
        </div>
      </form>
    </div>
  )
}

