import glob from 'fast-glob'

import { CSPostHogProvider } from './providers'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata = {
  title: {
    template: '%s - Basalt documentation',
    default: 'Basalt documentation',
  },
}

export default async function RootLayout({ children }) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )
  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <CSPostHogProvider>
              <Layout allSections={allSections}>{children}</Layout>
            </CSPostHogProvider>
          </div>
        </Providers>
      </body>
    </html>
  )
}
