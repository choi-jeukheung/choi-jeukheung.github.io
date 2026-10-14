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
