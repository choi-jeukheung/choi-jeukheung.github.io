import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

const MainProfile = () => {
  return (
    <div className="flex items-center gap-3 pt-7 pb-4 sm:pt-10">
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gray-100 dark:ring-gray-900/40">
        <Image
          src={siteMetadata.siteLogo}
          alt={siteMetadata.headerTitle}
          width={88}
          height={88}
          className="h-full w-full scale-175 object-cover"
        />
      </div>
      <div className="min-w-0">
        <h1 className="text-base font-black tracking-tight text-gray-900 dark:text-white">
          {siteMetadata.headerTitle}
        </h1>
        <p className="mt-0.5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          즉흥적으로 만드는 요리와 레시피
        </p>
      </div>
    </div>
  )
}

export default MainProfile
