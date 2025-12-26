import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { type Lang, LANG_LABEL, MESSAGES, type MessageTree } from './messages'

type I18nValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (path: string) => string
  ta: (path: string) => string[]
  label: typeof LANG_LABEL
}

const I18nContext = createContext<I18nValue | null>(null)

function pick(tree: MessageTree, path: string): unknown {
  const parts = path.split('.').filter(Boolean)
  let cur: unknown = tree
  for (const p of parts) {
    if (!cur || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

function getInitialLang(): Lang {
  const saved = localStorage.getItem('beautia.lang')
  if (saved === 'ko' || saved === 'en' || saved === 'ja' || saved === 'zh' || saved === 'th') return saved
  return 'en'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang())

  const setLang = (next: Lang) => {
    setLangState(next)
    localStorage.setItem('beautia.lang', next)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
  }, [lang])

  const value = useMemo<I18nValue>(() => {
    const get = (path: string) => pick(MESSAGES[lang], path) ?? pick(MESSAGES.en, path)
    const t = (path: string) => {
      const val = get(path)
      if (typeof val === 'string') return val
      if (Array.isArray(val)) return val.join(' ')
      return path
    }
    const ta = (path: string) => {
      const val = get(path)
      return Array.isArray(val) ? val.map(String) : []
    }

    return { lang, setLang, t, ta, label: LANG_LABEL }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}


