'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    adfit?: any
  }
}

export default function KakaoAd() {
  const pathname = usePathname()
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adRef.current) return

    adRef.current.innerHTML = `
      <ins
        class="kakao_ad_area"
        style="display:none"
        data-ad-unit="DAN-w3wMghmZ8z1IXPk5"
        data-ad-width="320"
        data-ad-height="100">
      </ins>
    `

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js'
    script.async = true

    adRef.current.appendChild(script)
  }, [pathname])

  return <div ref={adRef} />
}
