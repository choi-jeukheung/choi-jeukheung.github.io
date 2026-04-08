/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: '최즉흥',
  author: '최즉흥',
  headerTitle: '최즉흥',
  description: '최즉흥에 오신 것을 환영합니다!',
  language: 'ko-kr',
  theme: 'system', // system, dark or light
  siteUrl: 'https://myeoncipe.github.io/', // 나중에 실제 도메인으로 변경하세요
  siteRepo: 'https://myeoncipe.github.io/',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  // mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'cyd9911@gmail.com',
  // github: 'https://github.com', // 깃허브 주소
  // x: 'https://twitter.com/x',
  youtube: 'https://www.youtube.com/@%EB%A9%B4%EC%8B%9C%ED%94%BC-p4o',
  // linkedin: 'https://www.linkedin.com',
  // threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com/myeoncipe',
  // medium: 'https://medium.com',
  // bluesky: 'https://bsky.app/',
  tiktok: 'https://www.tiktok.com/@myeoncipe',
  locale: 'ko-KR',
  stickyNav: true, // 트렌디한 사이트는 헤더가 고정된 경우가 많아 true 추천
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
      lang: 'ko', // 댓글창 언어도 한국어로 변경
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
