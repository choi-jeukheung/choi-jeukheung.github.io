import { genPageMetadata } from 'app/seo'
import Image from 'next/image'
import { Youtube, Instagram, Mail } from '@/components/social-icons/icons'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = genPageMetadata({ title: '최즉흥 소개' })

const socialLinks = [
  {
    label: '유튜브',
    href: 'https://www.youtube.com/@%EC%B5%9C%EC%A6%89%ED%9D%A5-yjin',
    icon: Youtube,
    className: 'bg-[#FF0000] hover:bg-red-600 text-white',
  },
  {
    label: '인스타그램',
    href: 'https://www.instagram.com/choi_jeukheung',
    icon: Instagram,
    className:
      'bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white',
  },
  {
    label: '이메일',
    href: 'mailto:cyd5538@gmail.com',
    icon: Mail,
    className:
      'border border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50 text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-orange-900/50',
  },
]

const cookRules = [
  '지금 이 순간, 가장 당기는 메뉴일 것',
  '레시피에 갇히지 않고 감(Sense)으로 갈 것',
  '복잡한 정석보다 내 입맛에 맞는 변칙',
  '실패해도 그 과정 자체를 즐길 것',
]

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5 pt-16 pb-16">
      {/* 프로필 */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 h-[180px] w-[180px] overflow-hidden rounded-full ring-4 ring-orange-100 dark:ring-orange-900/40">
          <Image
            src={siteMetadata.siteLogo}
            alt={siteMetadata.headerTitle}
            width={180}
            height={180}
            className="h-full w-full scale-175 object-cover"
            priority
          />
        </div>
        <h1 className="mb-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white">
          {siteMetadata.headerTitle}
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          먹고싶은걸 즉흥적으로 만들어볼게요.
        </p>
      </div>

      {/* SNS 링크 */}
      <div className="mb-8 flex flex-col gap-3">
        <p className="mb-1 px-1 text-base font-black tracking-widest text-gray-900 uppercase dark:text-white">
          채널
        </p>
        {socialLinks.map(({ label, href, icon: Icon, className }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 rounded-2xl px-5 py-4 font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <Icon className="h-5 w-5 fill-current" />
            </span>
            <span className="flex-1 text-[15px]">{label}</span>
            <span className="opacity-50">↗</span>
          </a>
        ))}
      </div>

      {/* 구분선 */}
      <div className="my-8 border-t border-gray-100 dark:border-gray-800" />

      {/* 소개 */}
      <div className="mb-8">
        <p className="mb-1 px-1 text-base font-black tracking-widest text-gray-900 uppercase dark:text-white">
          소개
        </p>
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white px-6 py-6 text-[15px] leading-relaxed text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <p className="font-bold text-gray-900 dark:text-white">
            "레시피대로만 하면 재미없잖아요?"
          </p>
          <p className="mt-3">
            계량컵보다는 손맛을, 정석보다는 <strong>내 혀의 즉흥적인 감각</strong>을 믿습니다.
            릴스에서 보던 짧고 강렬한 요리부터, 블로그에 기록하는 깊은 맛의 기록까지 담고 있어요.
          </p>
          <p className="mt-3">
            면 요리라면 자다가도 일어납니다. 장르 불문, 세상의 모든 맛있는 레시피를
            <strong> '최즉흥' 스타일로 재해석해서 일단 맛있게 차려볼게요.</strong>
          </p>
        </div>
      </div>

      {/* 만드는 기준 */}
      <div className="mb-8">
        <p className="mb-1 px-1 text-base font-black tracking-widest text-gray-900 uppercase dark:text-white">
          만드는 기준
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {cookRules.map((rule) => (
            <div
              key={rule}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg dark:bg-orange-950/40">
                ✦
              </span>
              <span className="text-[15px] font-bold text-gray-800 dark:text-gray-100">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
