const MATCHERS = [
  {
    prefix: 'https://chrome.google.com',
    icon: '/icons/chrome-web-store.svg',
    alt: 'Install from Chrome Web Store',
  },
  {
    prefix: 'https://microsoftedge.microsoft.com',
    icon: '/icons/microsoft-store.svg',
    alt: 'Get it from Microsoft',
  },
  {
    prefix: 'https://greasyfork.org',
    icon: '/icons/greasyfork.svg',
    alt: 'Install from Greasy Fork',
  },
  {
    prefix: 'https://sleazyfork.org',
    icon: '/icons/greasyfork.svg',
    alt: 'Install from Greasy Fork',
  },
  {
    prefix: 'https://github.com',
    icon: '/icons/github-white.svg',
    alt: 'View on Github',
  },
]

export default function StoreLinks({ links }: { links: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {links.map(link => {
        const matcher = MATCHERS.find(m => link.startsWith(m.prefix))
        if (!matcher) {
          return null
        }
        const isGithub = matcher.icon.includes('github-white')
        return (
          <a
            key={link}
            href={link}
            target="_blank"
            rel="noreferrer"
            title={matcher.alt}
            className={
              isGithub
                ? 'flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 transition-transform hover:-translate-y-0.5'
                : 'flex h-10 items-center justify-center transition-transform hover:-translate-y-0.5'
            }
          >
            <img
              src={matcher.icon}
              alt={matcher.alt}
              className={isGithub ? 'h-5 w-5' : 'h-10 w-auto rounded-lg'}
            />
          </a>
        )
      })}
    </div>
  )
}
