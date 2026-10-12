import Link from 'next/link'
import { Youtube, Instagram } from '@/components/social-icons/icons'
import siteMetadata from '@/data/siteMetadata'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  )
}

const snsLinks = [
  // {
  //   label: 'TikTok',
  //   href: siteMetadata.tiktok,
  //   icon: (
  //     <TikTokIcon className="h-5 w-5 fill-black group-hover:fill-white dark:fill-white dark:group-hover:fill-black" />
  //   ),
  //   hoverClass:
  //     'hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white',
  // },
  {
    label: 'YouTube',
    href: siteMetadata.youtube,
    icon: <Youtube className="h-5 w-5 stroke-2" />,
    hoverClass: 'hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]',
  },
  {
    label: 'Instagram',
    href: siteMetadata.instagram,
    icon: <Instagram className="h-5 w-5 stroke-2" />,
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent',
  },
]

const MainSnsLink = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {snsLinks.map(({ label, href, icon, hoverClass }) =>
        href ? (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-800 transition-colors dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 ${hoverClass}`}
          >
            <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
            <span>{label}</span>
            <span className="text-gray-300 dark:text-gray-600">↗</span>
          </Link>
        ) : null
      )}
    </div>
  )
}

export default MainSnsLink
