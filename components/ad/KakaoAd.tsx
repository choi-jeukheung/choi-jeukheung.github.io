'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    adfit?: { destroy?: (unit: string) => void }
  }
}

export default function KakaoAd() {
  const pathname = usePathname()
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = adRef.current
    if (!container) return
    const unit = 'DAN-w3wMghmZ8z1IXPk5'

    // Defer the SDK request so Strict Mode's discarded effect never loads an ad.
    const timer = window.setTimeout(() => {
      container.innerHTML = `
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
      script.charset = 'utf-8'

      container.appendChild(script)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      // Release the previous placement before the same unit is used on a new page.
      window.adfit?.destroy?.(unit)
      container.replaceChildren()
    }
  }, [pathname])

  return <div ref={adRef} data-kakao-ad-slot className="w-full max-w-[320px] overflow-hidden" />
}
