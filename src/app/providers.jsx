'use client'

import posthog from 'posthog-js'
import { useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

import { PostHogProvider } from 'posthog-js/react'


if (typeof window !== 'undefined') {
  posthog.init('phc_RnCOvNiwUQbN9BGEmqskmwcLSPFKKXeWCY050aDxbzr', {
    api_host: 'https://e.getbasalt.ai',
	ui_host: 'https://eu.posthog.com',
    person_profiles: 'always',
  })
}
export function CSPostHogProvider({ children }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}


function ThemeWatcher() {
  let { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    let media = window.matchMedia('(prefers-color-scheme: dark)')

    function onMediaChange() {
      let systemTheme = media.matches ? 'dark' : 'light'
      if (resolvedTheme === systemTheme) {
        setTheme('system')
      }
    }

    onMediaChange()
    media.addEventListener('change', onMediaChange)

    return () => {
      media.removeEventListener('change', onMediaChange)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <ThemeWatcher />
      {children}
    </ThemeProvider>
  )
}
