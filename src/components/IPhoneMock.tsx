import clsx from 'clsx'

export function IPhoneMock({ className }: { className?: string }) {
  return (
    <div className={clsx('relative mx-auto w-[280px] sm:w-[340px]', className)}>
      {/* Titanium Silver frame */}
      <div className="rounded-[44px] bg-[linear-gradient(180deg,#f8fafc,#e5e7eb)] p-[10px] shadow-quiet-xl">
        <div className="rounded-[36px] bg-[linear-gradient(180deg,#0b1220,#0b1220)] p-[10px]">
          {/* Screen */}
          <div className="relative overflow-hidden rounded-[28px] bg-white">
            {/* notch */}
            <div className="pointer-events-none absolute left-1/2 top-2 h-[18px] w-[108px] -translate-x-1/2 rounded-full bg-black/90" />

            {/* UI mock */}
            <div className="relative h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 opacity-60 blur-[90px] bg-[radial-gradient(40%_35%_at_20%_25%,rgba(249,180,201,0.8),transparent),radial-gradient(40%_35%_at_75%_30%,rgba(182,230,216,0.8),transparent),radial-gradient(40%_35%_at_55%_75%,rgba(185,183,245,0.8),transparent)]" />

              <div className="relative p-5 pt-12 text-white">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold">Verified</div>
                  <div className="rounded-full bg-white/10 px-2 py-1 text-[11px]">4.9★</div>
                </div>

                <div className="mt-4 text-2xl font-extrabold leading-snug tracking-tight">
                  Glow Salon — Tokyo Shibuya
                </div>
                <div className="mt-2 text-xs font-medium text-white/80">
                  Transparent pricing · Instant chat · Women-led team
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.55)] backdrop-blur"
                    >
                      <div className="h-24 w-full bg-[linear-gradient(135deg,rgba(249,180,201,0.6),rgba(182,230,216,0.5),rgba(185,183,245,0.55))]" />
                      <div className="p-3 text-[11px] font-semibold">
                        <div className="flex items-center justify-between">
                          <span>Hair Spa</span>
                          <span className="rounded-full bg-black/30 px-2 py-[2px] text-[10px]">¥8,900</span>
                        </div>
                        <div className="mt-1 text-[10px] font-medium text-white/70">60 min · Seat guarantee</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-sm font-semibold backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
                  Book instantly · Chat in-app · No surprise fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* side highlights */}
      <div className="pointer-events-none absolute inset-0 rounded-[44px] border border-white/40" />
      <div className="pointer-events-none absolute inset-0 rounded-[44px] border border-black/5" />
    </div>
  )
}


