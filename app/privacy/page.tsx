import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '개인정보처리방침' })

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">개인정보처리방침</h1>

      <p className="mb-6 text-sm text-gray-500">최종 업데이트: 2026년 4월 29일</p>

      <section className="mb-8">
        <p className="leading-relaxed">
          최즉흥(이하 "사이트")은 방문자의 개인정보를 소중히 여기며, 관련 법령을 준수합니다. 본
          개인정보처리방침은 사이트 이용 과정에서 수집되는 정보와 그 활용 방법에 대해 안내합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">1. 수집하는 정보</h2>
        <p className="leading-relaxed">
          본 사이트는 직접적으로 개인정보를 수집하지 않습니다. 다만, 아래의 제3자 서비스를 통해
          익명화된 사용 데이터가 자동으로 수집될 수 있습니다.
        </p>
        <ul className="mt-3 list-disc pl-6 leading-relaxed">
          <li>IP 주소</li>
          <li>브라우저 종류 및 버전</li>
          <li>방문 페이지 및 시간</li>
          <li>쿠키 및 유사 추적 기술</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">2. Google 애드센스 및 광고</h2>
        <p className="leading-relaxed">
          본 사이트는 Google AdSense를 통해 광고를 게재합니다. Google은 쿠키를 사용하여 방문자의
          관심사에 맞는 광고를 표시할 수 있습니다. 방문자는{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Google 광고 설정
          </a>
          에서 개인 맞춤 광고를 비활성화할 수 있습니다.
        </p>
        <p className="mt-3 leading-relaxed">
          Google의 개인정보 처리 방식에 대한 자세한 내용은{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Google 개인정보처리방침
          </a>
          을 참고하세요.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">3. Google 애널리틱스</h2>
        <p className="leading-relaxed">
          본 사이트는 Google Analytics를 사용하여 방문자의 사이트 이용 현황을 분석합니다. 수집된
          데이터는 익명으로 처리되며 개인을 식별하는 데 사용되지 않습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">4. 쿠키 사용</h2>
        <p className="leading-relaxed">
          본 사이트는 사용자 경험 개선 및 광고 제공을 위해 쿠키를 사용합니다. 브라우저 설정을 통해
          쿠키를 거부할 수 있으나, 일부 기능이 제한될 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">5. 제3자 링크</h2>
        <p className="leading-relaxed">
          본 사이트에는 외부 사이트로의 링크가 포함될 수 있습니다. 외부 사이트의 개인정보처리방침은
          해당 사이트의 책임이며, 본 사이트는 이에 대해 책임지지 않습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold">6. 문의</h2>
        <p className="leading-relaxed">개인정보 처리에 관한 문의사항은 아래 이메일로 연락주세요.</p>
        <p className="mt-2">
          <a href="mailto:cyd5538@gmail.com" className="text-blue-500 underline">
            cyd5538@gmail.com
          </a>
        </p>
      </section>
    </div>
  )
}
