'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function KakaoAd2() {
  const pathname = usePathname()
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adRef.current) return

    adRef.current.innerHTML = ''

    const ins = document.createElement('ins')
    ins.className = 'kakao_ad_area'
    ins.style.display = 'none'
    ins.setAttribute('data-ad-unit', 'DAN-RBfySOIDmEghd7Ed')
    ins.setAttribute('data-ad-width', '320')
    ins.setAttribute('data-ad-height', '480') // ✅ 수정

    adRef.current.appendChild(ins)

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js'
    script.async = true

    adRef.current.appendChild(script)
  }, [pathname])

  return <div ref={adRef} className="flex w-full justify-center" />
}
