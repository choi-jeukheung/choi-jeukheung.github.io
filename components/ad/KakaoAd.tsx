'use client'

import Script from 'next/script'

export default function KakaoAd() {
  return (
    <>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-w3wMghmZ8z1IXPk5"
        data-ad-width="320"
        data-ad-height="100"
      />

      <Script src="https://t1.kakaocdn.net/kas/static/ba.min.js" strategy="afterInteractive" />
    </>
  )
}
