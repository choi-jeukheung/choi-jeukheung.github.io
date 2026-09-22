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
