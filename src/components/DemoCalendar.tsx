import clsx from 'clsx'
import { Magnetic } from './Magnetic'

const slots = [
  { day: 'Mon', date: '20', time: '10:00', status: 'open' },
  { day: 'Mon', date: '20', time: '11:00', status: 'open' },
  { day: 'Mon', date: '20', time: '14:00', status: 'hold' },
  { day: 'Tue', date: '21', time: '10:00', status: 'open' },
  { day: 'Tue', date: '21', time: '13:00', status: 'open' },
  { day: 'Tue', date: '21', time: '15:00', status: 'hold' },
]

export function DemoCalendar({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white/80 p-4 shadow-quiet-md backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-extrabold tracking-tight text-slate-900">{title}</div>
        <div className="text-[11px] font-semibold text-slate-500">{subtitle}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slots.map((slot, i) => (
          <Magnetic key={i} strength={6}>
            <button
              className={clsx(
                'w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold shadow-[0_12px_30px_-25px_rgba(0,0,0,0.35)] transition-colors',
                slot.status === 'open'
                  ? 'border-black/5 bg-white hover:border-slate-300'
                  : 'border-amber-200 bg-amber-50 text-amber-800'
              )}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{slot.day}</span>
                <span>{slot.date}</span>
              </div>
              <div className="text-base font-extrabold text-slate-900">{slot.time}</div>
              <div className="text-[11px] font-semibold text-slate-500">
                {slot.status === 'open' ? 'Open' : 'On hold'}
              </div>
            </button>
          </Magnetic>
        ))}
      </div>
    </div>
  )
}


