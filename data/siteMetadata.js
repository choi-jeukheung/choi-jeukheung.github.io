/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '최즉흥 | 쉽고 맛있는 레시피 블로그',
  author: '최즉흥',
  headerTitle: '최즉흥',
  description:
    '라면, 파스타, 한식 등 직접 만들어본 쉽고 맛있는 레시피를 공유하는 요리 블로그입니다. 누구나 따라 할 수 있는 간단한 집밥 레시피와 요리 팁을 소개합니다.',
  language: 'ko-kr',

  theme: 'system',

  siteUrl: 'https://choi-jeukheung.github.io/',
  siteRepo: 'https://choi-jeukheung.github.io/',

  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,

  email: 'cyd5538@gmail.com',

  youtube: 'https://www.youtube.com/@%EC%B5%9C%EC%A6%89%ED%9D%A5-yjin',
  instagram: 'https://www.instagram.com/choi_jeukheung',
  tiktok: 'https://www.tiktok.com/@choi_jeukheung',

  locale: 'ko-KR',

  stickyNav: true,

  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },

  newsletter: {
    provider: 'buttondown',
  },

  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      lang: 'ko',
    },
  },

  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
