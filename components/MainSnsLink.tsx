import Link from 'next/link'
import { Youtube, Instagram } from '@/components/social-icons/icons'
import siteMetadata from '@/data/siteMetadata'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const snsLinks = [
  {
    label: 'TikTok',
    href: siteMetadata.tiktok,
    icon: <TikTokIcon className="h-5 w-5" />,
    hoverClass:
      'hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white',
  },
  {
    label: 'YouTube',
    href: siteMetadata.youtube,
    icon: <Youtube className="h-5 w-5 fill-current" />,
    hoverClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
  },
  {
    label: 'Instagram',
    href: siteMetadata.instagram,
    icon: <Instagram className="h-5 w-5 fill-current" />,
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent',
  },
]

const MainSnsLink = () => {
  return (
    <div className="flex flex-col gap-3">
      {snsLinks.map(({ label, href, icon, hoverClass }) =>
        href ? (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 font-bold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${hoverClass}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700">
              {icon}
            </span>
            <span className="flex-1 text-[15px]">{label}</span>
            <span className="text-gray-300 dark:text-gray-600">↗</span>
          </Link>
        ) : null
      )}
    </div>
  )
}

export default MainSnsLink
