import Image from 'next/image'

import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'
import logoTypescript from '@/images/logos/typescript.svg'
import logoPython from '@/images/logos/python.svg'

const libraries = [
  {
    href: '/sdks/python',
    name: 'Python',
    description:
      'Our official Python SDK with full type hints, async support, and comprehensive features for AI prompt management.',
    logo: logoPython,
  },
  {
    href: '/sdks/typescript',
    name: 'TypeScript',
    description:
      'Type-safe JavaScript/TypeScript SDK with first-class support for Node.js 18+ and modern browsers.',
    logo: logoTypescript,
  },
]

export function Libraries() {
  return (
    <div className="my-8">
      <div className="not-prose mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:max-w-none xl:grid-cols-2 dark:border-white/5">
        {libraries.map((library) => (
          <div key={library.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {library.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {library.description}
              </p>
            </div>
            <Image
              src={library.logo}
              alt={`${library.name} logo`}
              className="h-12 w-12"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}