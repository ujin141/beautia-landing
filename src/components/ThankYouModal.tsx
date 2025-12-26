import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { Magnetic } from './Magnetic'
import { useEffect, useRef } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  body: string
}

export function ThankYouModal({ open, onClose, title, body }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const dialogTitleId = 'thankyou-title'
  const dialogDescId = 'thankyou-desc'

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby={dialogTitleId}
          aria-describedby={dialogDescId}
        >
          <motion.div
            className={clsx(
              'relative w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-6 shadow-quiet-xl backdrop-blur'
            )}
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          >
            <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(40%_35%_at_20%_25%,#F9B4C9,transparent),radial-gradient(40%_35%_at_75%_30%,#B6E6D8,transparent),radial-gradient(40%_35%_at_55%_75%,#B9B7F5,transparent)]" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] text-sm font-extrabold text-slate-900 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.35)]">
                  ✓
                </div>
                <div id={dialogTitleId} className="text-lg font-extrabold tracking-tight text-slate-900">
                  {title}
                </div>
              </div>
              <p id={dialogDescId} className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {body}
              </p>

              <div className="mt-5 flex justify-end">
                <Magnetic>
                  <button
                    ref={closeRef}
                    onClick={onClose}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold tracking-tight text-white shadow-quiet-md hover:bg-slate-800"
                  >
                    Close
                  </button>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


