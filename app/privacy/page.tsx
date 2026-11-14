import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import PageIntro from '@/components/layout/PageIntro'

export const metadata = genPageMetadata({
  title: '개인정보처리방침',
  description: '최즉흥 블로그의 문의 처리, 방문 분석, 광고, 영상 및 외부 서비스 이용 안내입니다.',
})

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl py-8 sm:py-12">
      <PageIntro eyebrow="사이트 이용 안내" title="개인정보처리방침">
        시행 및 최종 수정일: 2026년 11월 14일
      </PageIntro>
      <div className="prose dark:prose-invert mt-8 max-w-none break-words">
        <p>
          최즉흥은 직접 만든 음식의 레시피와 영상을 소개하는 개인 블로그입니다. 이 방침은 사이트에서
          사용하는 서비스와 이용 과정에서 처리될 수 있는 정보를 설명합니다. 운영자 및 개인정보 관련
          문의 담당자는 최즉흥입니다.
        </p>
        <h2>1. 이메일 문의와 개인정보 요청</h2>
        <p>
          회원가입이나 댓글 작성 기능은 운영하지 않습니다. 이메일로 문의하면 발신자의 이메일 주소,
          이름 및 직접 작성한 문의 내용이 전달됩니다. 이 정보는 문의 답변과 오류 수정 등 요청을
          처리하는 데 사용하며, 문의에 필요하지 않은 민감한 정보는 보내지 않으셔도 됩니다.
        </p>
        <p>
          문의 정보는 처리 목적이 달성되면 삭제하는 것을 원칙으로 합니다. 후속 문의 대응이나 법령상
          보관이 필요한 경우에는 필요한 범위에서 보관합니다. 본인이 보낸 문의의 열람, 정정 또는
          삭제를 원하면 아래 연락처로 요청해 주세요. 확인 후 처리 가능 여부와 결과를 안내합니다.
        </p>
        <p>
          연락처: <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
        </p>
        <h2>2. 방문 분석과 사이트 운영</h2>
        <p>
          방문 경로와 페이지 이용 현황을 파악하고 콘텐츠를 개선하기 위해 Google Analytics를
          사용합니다. Google Tag Manager는 분석 등 사이트에서 사용하는 태그를 관리합니다. 서비스
          이용 시 방문 URL, 접속 시간, 브라우저·기기 정보, 쿠키 식별자 등이 처리될 수 있으며,
          Google로 연결되는 과정에서 IP 주소가 전달될 수 있습니다.
        </p>
        <p>
          Google의 정보 처리 방식과 이용자 선택 사항은{' '}
          <a href="https://policies.google.com/technologies/partner-sites?hl=ko">
            Google 서비스를 사용하는 사이트의 정보 처리 안내
          </a>
          에서 확인할 수 있습니다. 분석 정보의 보관과 처리는 해당 서비스의 설정 및 정책에 따릅니다.
        </p>
        {process.env.NEXT_UMAMI_ID && (
          <p>
            방문 통계 확인을 위해 Umami도 사용합니다. 자세한 정보 처리 방식은{' '}
            <a href="https://umami.is/privacy">Umami 개인정보처리방침</a>을 참고해 주세요.
          </p>
        )}
        <p>
          사이트는 GitHub Pages에서 제공됩니다. 접속 및 보안 유지 과정의 정보 처리는{' '}
          <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
            GitHub 개인정보처리방침
          </a>
          을 참고해 주세요.
        </p>
        <h2>3. 광고와 제휴 상품 링크</h2>
        <p>
          현재 사이트의 배너 광고는 카카오 애드핏을 통해 제공됩니다. 광고 제공과 성과 측정을 위해
          광고 서비스에서 쿠키, 기기·브라우저 정보 및 광고 이용 기록 등을 처리할 수 있습니다. 자세한
          사항은 <a href="https://www.kakao.com/policy/privacy?lang=ko">카카오 개인정보처리방침</a>
          을 확인해 주세요.
        </p>
        <p>
          일부 레시피와 상품 소개에는 쿠팡파트너스 링크가 있습니다. 해당 링크를 통한 구매가 발생하면
          운영자가 일정액의 수수료를 제공받을 수 있으며, 제휴 관계는 해당 영역에 표시합니다. 링크
          이동 후의 구매·결제 정보는 쿠팡에서 처리합니다. 상품 이미지는 쿠팡의 이미지 서버에서
          불러올 수 있습니다. 관련 내용은{' '}
          <a href="https://privacy.coupang.com/ko/center/coupang/">쿠팡 개인정보처리방침</a>을
          참고해 주세요.
        </p>
        <h2>4. YouTube 영상과 외부 서비스</h2>
        <p>
          조리 영상을 보여주기 위해 YouTube 삽입 플레이어를 사용합니다. 플레이어를 불러오거나 재생할
          때 YouTube·Google로 접속 정보가 전달되고 쿠키 등이 사용될 수 있습니다. YouTube 계정 로그인
          상태와 서비스 설정에 따라 처리 방식이 달라질 수 있습니다.
        </p>
        <p>
          외부 영상, 광고, 이미지 등을 불러오면 해당 제공자에게 IP 주소와 브라우저 정보 등이 전달될
          수 있습니다. 외부 링크로 이동한 뒤에는 해당 사이트의 개인정보처리방침이 적용됩니다. Google
          등 해외 사업자의 서비스를 이용하는 과정에서 정보가 국외 서버에서 처리될 수 있으며, 처리
          위치와 보호 조치는 각 제공자의 정책을 확인해 주세요.
        </p>
        <h2>5. 쿠키와 이용자의 선택</h2>
        <p>
          브라우저의 개인정보 설정에서 쿠키를 삭제하거나 저장을 제한할 수 있습니다. Google의 분석
          수집을 제한하는 방법은{' '}
          <a href="https://tools.google.com/dlpage/gaoptout?hl=ko">
            Google Analytics 차단 도구 안내
          </a>
          를 참고해 주세요. 쿠키나 외부 콘텐츠를 차단하면 광고·영상 등 일부 기능이 작동하지 않을 수
          있습니다. 쿠키 삭제만으로 이미 제공자에게 전달된 정보까지 삭제되는 것은 아닙니다.
        </p>
        <h2>6. 방침의 변경</h2>
        <p>
          사용하는 서비스나 개인정보 처리 방식이 바뀌면 이 페이지와 수정일을 갱신합니다. 개인정보
          관련 문의는 위 이메일로 보내주세요.
        </p>
      </div>
    </article>
  )
}
