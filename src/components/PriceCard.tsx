import clsx from 'clsx'

type Item = { title: string; desc: string; price: string; tag?: string }

export function PriceCard({
  title = 'Pricing demo',
  items,
  accent,
  footer,
}: {
  title?: string
  items: Item[]
  accent?: 'pink' | 'mint' | 'lavender'
  footer?: string
}) {
  const accentBg =
    accent === 'mint'
      ? 'from-[rgba(182,230,216,0.4)] via-white to-[rgba(182,230,216,0.2)]'
      : accent === 'lavender'
        ? 'from-[rgba(185,183,245,0.4)] via-white to-[rgba(185,183,245,0.2)]'
        : 'from-[rgba(249,180,201,0.4)] via-white to-[rgba(249,180,201,0.2)]'

  return (
    <div
      className={clsx(
        'rounded-2xl border border-black/5 bg-gradient-to-br p-5 shadow-quiet-md backdrop-blur',
        accentBg
      )}
    >
      <div className="mb-3 text-sm font-extrabold tracking-tight text-slate-900">{title}</div>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border border-black/5 bg-white/70 p-3 shadow-[0_12px_30px_-25px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-extrabold text-slate-900">{it.title}</div>
                <div className="text-xs font-medium text-slate-600">{it.desc}</div>
              </div>
              <div className="text-sm font-extrabold text-slate-900">{it.price}</div>
            </div>
            {it.tag ? (
              <div className="mt-2 inline-flex items-center rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                {it.tag}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {footer ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-[0_12px_30px_-28px_rgba(0,0,0,0.35)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)]" />
          {footer}
        </div>
      ) : null}
    </div>
  )
}


