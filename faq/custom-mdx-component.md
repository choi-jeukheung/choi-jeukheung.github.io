# How can I add a custom MDX component?

## 유튜브 영상 추가하기

MDX 본문(상단 `---` 메타데이터 아래)의 원하는 위치에 다음 컴포넌트를 넣습니다.
두 컴포넌트 모두 `components/mdx/MDXComponents.tsx`에 등록되어 있어 MDX에서 별도로 import할 필요가 없습니다.

```mdx
{/* 일반 영상: 가로 16:9 */}

<YouTube videoId="영상_ID" />

{/* 제목을 직접 지정할 수도 있습니다. */}

<YouTube videoId="영상_ID" title="아라비아따 파스타 전체 레시피" />

{/* 쇼츠: 세로 9:16 */}

<YouTubeShorts videoId="영상_ID" />
```

`videoId`에는 전체 URL이 아닌 영상 ID만 입력합니다. 예를 들어 `https://www.youtube.com/watch?v=abcdefghijk`라면 `abcdefghijk`를 넣습니다.
일반 영상 컴포넌트는 `components/recipe/Youtube.tsx`, 쇼츠 컴포넌트는 `components/recipe/YoutubeShorts.tsx`에서 수정합니다.

## Custom component example

Here's an example on how to create a donut chart from Chart.js (assuming you already have the dependencies installed) and use it in MDX posts. First, create a new `DonutChart.tsx` component in `components`:

```tsx
'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DonutChart = ({ data }) => {
  return <Doughnut data={data} />
}

export default Doughnut
```

Since the underlying `Doughnut` component uses React hooks, we add the `'use client'` directive to specify that it is a client side component. Also, there is an existing issue which prevents named components from being used, so we need to export the component as the default export.

Next, add the component to `MDXComponents.tsx`:

```diff
...
+ import DonutChart from './DonutChart'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
+  DonutChart,
  BlogNewsletterForm,
}
```

You can now use the component in `.mdx` files:

```mdx
## Example Donut Chart

export const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
    },
  ],
}

<DonutChart data={data} />
```

## 레시피 검색 제목

새 레시피는 화면용 `title`과 검색용 `seoTitle`을 구분합니다.

```yaml
title: '팬 하나로 노릇하게 구운 감자 프리타타'
seoTitle: '감자 프리타타 만들기 | 오븐 없이 팬으로 굽는 레시피'
```

`seoTitle`이 없으면 `title`을 사용합니다. 음식 이름과 실제 조리법을 간결하게 적고, 같은 키워드를 반복하지 않습니다. 화면의 글 제목은 `title`을 유지합니다. 검색엔진이 실제 표시 제목을 바꿀 수 있습니다.

Recipe 구조화 데이터는 본문의 `## 준비한 재료` 아래 목록과 `## 이렇게 만들었어요` 또는 `## 만드는 순서` 아래 단계에서 생성됩니다. 재료의 하위 제목(양념, 소스 등)도 포함합니다. 별도의 팁이나 상품 소개는 조리 단계 밖에 둡니다. 변경한 글의 본문을 수정했다면 `lastmod`에 실제 수정일을 기록합니다.

## 레시피 구조화 데이터 권장 항목

`videoType`은 사이트의 영상 분류이며 Google의 `video`와는 별개입니다.
본문에 `YouTube` 또는 `YouTubeShorts`가 있고 `videoUploadDate`가 있으면 해당 영상의 `VideoObject`를 생성합니다. 코드 블록의 예시는 읽지 않습니다.

```yaml
# 실제 YouTube 공개 일시와 영상 길이를 확인해서 작성합니다. 글 날짜로 대신하지 않습니다.
videoUploadDate: '2026-10-15T10:57:47+09:00'
videoDuration: 'PT14S'
recipeCuisine: '일본식'
totalTime: 'PT5M'
```

`recipeCuisine`은 글 화면에도 표시됩니다. `totalTime`은 본문/조리 시간에 안내한 전체 소요 시간을 ISO 8601 형식으로 적습니다(`PT20M` = 20분). 준비와 가열 시간을 따로 확인했다면 `prepTime`과 `cookTime`을 **함께** 적고 본문에도 안내하세요. 전체 시간을 임의로 나눠 채우지 않습니다. 이 세 글에는 전체 시간만 알려져 있어 준비 시간은 비워두었습니다.

단계별 이미지가 있다면 해당 H3 조리 단계 아래 또는 번호 목록 항목 안에 `![감자를 채 써는 모습](/static/images/실제-사진.jpg)` 형태로 넣으세요. 본문 이미지가 해당 `HowToStep.image`에도 반영됩니다. 전체 요리 썸네일을 모든 단계 사진으로 재사용하거나 영상 구간을 임의로 만들지 않습니다.

`nutrition`은 재료량과 인분 수가 확인되어 1인분 영양정보를 계산할 수 있을 때 추가해야 합니다. 현재는 미계량 재료가 있어 출력하지 않습니다. 향후 지원 시 `recipeYield`(인분 수)와 본문의 영양정보도 함께 제공해야 합니다.

권장 항목 누락 경고는 필수 항목 오류와 다릅니다. 배포 후 Google 리치 결과 테스트에서 확인하고 Search Console에서 수정된 항목의 유효성 검사를 요청하세요. 영양정보·준비 시간·단계별 미디어가 없는 경우 해당 권장 경고는 남을 수 있습니다.

## 본문 중간에 카카오 광고 넣기

MDX 본문에서 원하는 문단 사이에 아래 코드를 넣습니다. 별도 import는 필요 없습니다.

```mdx
<div className="not-prose my-8 flex justify-center">
  <KakaoAd />
</div>
```

본문에 `<KakaoAd />`가 있으면 글 끝의 자동 광고는 생략합니다. 없는 글은 기존처럼 하단 광고를 유지합니다. 기본 광고는 같은 글에 한 번만 넣으세요. 긴 글 하단에는 `<KakaoAd placement="bottom" />`을 추가할 수 있습니다. `data/adUnits.ts`에서 광고단위 ID와 발급 규격을 함께 관리합니다. 현재 기본 광고와 긴 글 하단 광고는 모두 320×100이며 서로 다른 광고단위 ID를 사용합니다. 기본 광고와 같은 ID를 넣지 않습니다. 코드 블록 안에 작성한 예시는 실제 광고로 계산하지 않습니다.

광고 컴포넌트는 브라우저에서 카카오 스크립트를 불러옵니다. MDX 빌드 성공과 실제 광고 송출은 별개이므로 배포된 도메인에서 광고 차단을 끄고 확인하세요.
