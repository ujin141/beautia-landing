import clsx from 'clsx'

type DotNavProps = {
  items: { id: string; label: string }[]
  activeId: string
  onSelect: (id: string) => void
}

export function DotNav({ items, activeId, onSelect }: DotNavProps) {
  return (
    <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {items.map((it) => {
        const active = it.id === activeId
        return (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            className={clsx(
              'group relative grid h-3 w-3 place-items-center rounded-full border border-slate-200 bg-white/80 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.4)] backdrop-blur',
              'transition-transform duration-200 hover:scale-115',
              active && 'bg-[linear-gradient(90deg,#F9B4C9,#B6E6D8,#B9B7F5)] border-transparent'
            )}
            aria-label={it.label}
            title={it.label}
          >
            <span
              className={clsx(
                'block h-1.5 w-1.5 rounded-full bg-black/25 transition-colors',
                active && 'bg-white'
              )}
            />
            <span
              className={clsx(
                'pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-xl border border-black/5 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-slate-700 opacity-0 shadow-[0_12px_32px_-26px_rgba(0,0,0,0.45)] transition-opacity duration-150',
                'group-hover:opacity-100'
              )}
            >
              {it.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}


