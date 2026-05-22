import { genPageMetadata } from 'app/seo'
import Image from 'next/image'
import { Youtube, Instagram, Mail, Tiktok } from '@/components/social-icons/icons'
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
    label: '틱톡',
    href: 'https://www.tiktok.com/@choi_jeukheung',
    icon: Tiktok,
    className: 'bg-black dark:bg-gray-900 text-white hover:opacity-90',
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
  '지금 내가 가장 먹고 싶었던 음식',
  '레시피에 갇히지 않고 감(Sense)으로 갈 것',
  '누구나 따라 해보고 싶은 맛있는 음식',
  '실패해도 즐겁게 배워나가는 과정',
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
            안녕하세요, '최즉흥'입니다.
            <br />
            사실 올해부터 본격적으로 요리에 재미를 붙이기 시작했어요. 요리를 전문적으로 배운 사람은
            아니고, 그냥 그날그날 내가 먹고 싶은 메뉴를 즉흥적으로 만들어서 편하게 기록해 두는
            공간입니다.
            <br />
            정확하게 계량하는 것보단 대충 손대중으로 때려 넣으면서 내 입맛에 맞춰 맛있게 요리해
            볼게요.
          </p>
          <p className="mt-3">
            특히 면 요리라면 환장합니다.
            <br />
            장르 상관없이 제 스타일대로 재해석한 즉흥 레시피들 편하게 기록해 둘 테니까, 구경하시다가
            당기는 거 있으면 여러분도 즉흥적으로 한번 만들어 보세요!
          </p>
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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500 text-lg dark:bg-orange-950/40">
                  🍝
                </span>
                <span className="text-[15px] font-bold text-gray-800 dark:text-gray-100">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
