import clsx from 'clsx'
import { useI18n } from '../i18n/i18n'
import { type Lang } from '../i18n/messages'
import { Magnetic } from './Magnetic'
import { motion } from 'framer-motion'

const LANGS: Lang[] = ['ko', 'en', 'ja', 'zh', 'th']

export function LanguagePicker({ className }: { className?: string }) {
  const { lang, setLang, label } = useI18n()

  return (
    <Magnetic className={clsx('inline-flex', className)} strength={8}>
      <div className="rounded-2xl border border-black/5 bg-white/70 p-1 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.35)] backdrop-blur">
        <div className="flex gap-1">
          {LANGS.map((l) => {
            const active = l === lang
            return (
              <motion.button
                key={l}
                onClick={() => setLang(l)}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  'rounded-xl px-2.5 py-1.5 text-xs font-semibold tracking-tight transition-colors',
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-black/5'
                )}
                aria-pressed={active}
              >
                {label[l]}
              </motion.button>
            )
          })}
        </div>
      </div>
    </Magnetic>
  )
}


