import { genPageMetadata } from 'app/seo'
import Link from 'next/link'
import Image from 'next/image'
import siteMetadata from '@/data/siteMetadata'
import MainSnsLink from '@/components/home/MainSnsLink'
import MainContour from '@/components/home/MainContour'
import type { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: '최즉흥 소개',
  description:
    '30대 백수 남자의 잘 해 먹는 일상. 한식·일식·양식·중식 조리기능사를 취득한 최즉흥의 맛있는 한 끼 프로젝트입니다.',
})

const qualifications = ['한식', '일식', '양식', '중식']

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[640px] px-5 pb-16">
      <header className="pt-16 pb-8 text-center">
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
        <p className="mb-3 text-sm font-bold text-orange-600 dark:text-orange-400">
          30대 백수 남자의 잘 해 먹는 일상
        </p>
        <h1 className="mb-3 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          백수지만, 밥은 잘 해 먹습니다.
        </h1>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          먹고 싶은 게 생기면 일단 주방으로 갑니다.
          <br />
          안녕하세요, 최즉흥입니다.
        </p>
      </header>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          시간은 좀 있고, 먹고 싶은 건 많습니다.
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          <p>
            30대 백수 남자입니다. 하루 세 끼를 다 거창하게 차리는 건 아니지만, 먹고 싶은 음식이
            떠오르면 직접 만들어 보는 편이에요. 냉장고에 있는 재료를 꺼내 시작할 때도 있고, 한 끼
            먹겠다고 장부터 보고 올 때도 있습니다.
          </p>
          <p>
            한식, 일식, 양식, 중식 조리기능사를 따뒀습니다. 배운 것도 써먹고, 제 입맛대로 바꿔보기도
            하면서 요리해요. 자격증은 네 개지만 매일의 고민은 똑같습니다. 그래서 오늘은 뭘 먹지?
          </p>
          <p>
            여기는 그렇게 해 먹은 음식들을 남기는 공간입니다. 만드는 과정은 영상으로, 재료와 순서는
            글로 정리해 둡니다. 구경하다가 당기는 메뉴가 있으면 한 번 해 드셔 보세요.
          </p>
        </div>
      </section>

      <MainContour />

      <section aria-labelledby="qualifications-heading">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2
            id="qualifications-heading"
            className="text-lg font-black text-gray-900 dark:text-white"
          >
            주방에 쌓아둔 기본기
          </h2>
          <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
            조리기능사 4종 취득
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {qualifications.map((name) => (
            <li
              key={name}
              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400"
              >
                ✓
              </span>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">조리기능사</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <MainContour />

      <section aria-labelledby="channels-heading">
        <h2 id="channels-heading" className="mb-4 text-lg font-black text-gray-900 dark:text-white">
          다른 곳에서도 만나요
        </h2>
        <MainSnsLink />
        <a
          href="mailto:cyd5538@gmail.com"
          className="mt-3 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 text-[15px] font-bold text-gray-800 shadow-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-orange-900/40"
        >
          <span>이야기 나누고 싶다면, 이메일</span>
          <span aria-hidden="true" className="text-gray-400">
            ↗
          </span>
        </a>
      </section>
      <div className="mt-8 flex justify-center">
        <Link
          href="/recipe"
          className="rounded-2xl border-2 border-gray-200 bg-white px-8 py-3 text-sm font-black text-gray-700 shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
        >
          오늘 뭐 해 먹지? 레시피 보기 →
        </Link>
      </div>
    </article>
  )
}
