import { type Lang } from '../i18n/messages'

export const LAUNCH_AT = new Date('2026-02-10T10:00:00+09:00')

const localeMap: Record<Lang, string> = {
  en: 'en-US',
  ko: 'ko-KR',
  ja: 'ja-JP',
  zh: 'zh-CN',
  th: 'th-TH',
}

export function formatLaunchInfo(lang: Lang, label: string) {
  const locale = localeMap[lang] ?? 'en-US'
  const fmt = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
    timeZoneName: 'short',
  })
  const parts = fmt.formatToParts(LAUNCH_AT)
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'KST'
  return {
    title: `${label} · ${fmt.format(LAUNCH_AT)}`,
    headline: `${fmt.format(LAUNCH_AT)} (${tz})`,
    tzLabel: tz,
  }
}


