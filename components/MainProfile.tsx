import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

const MainProfile = () => {
  return (
    <div className="pt-10 pb-8 text-center">
      <div className="mx-auto mb-5 h-[150px] w-[150px] overflow-hidden rounded-full ring-4 ring-orange-100 dark:ring-orange-900/40">
        <Image
          src={siteMetadata.siteLogo}
          alt={siteMetadata.headerTitle}
          width={88}
          height={88}
          className="h-full w-full scale-175 object-cover"
        />
      </div>
      <h1 className="mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
        {siteMetadata.headerTitle}
      </h1>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        먹고싶거나 해보고싶었던 음식을 📂
        <br />
        즉흥적으로 해봅니다.
      </p>
    </div>
  )
}

export default MainProfile
