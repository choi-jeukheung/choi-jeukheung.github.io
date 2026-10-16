'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { adUnits } from '@/data/adUnits'

declare global {
  interface Window {
    adfit?: { destroy?: (unit: string) => void }
  }
}

export default function KakaoAd({ placement = 'default' }: { placement?: keyof typeof adUnits }) {
  const pathname = usePathname()
  const adRef = useRef<HTMLDivElement>(null)
  const { id: unit, width, height } = adUnits[placement]

  useEffect(() => {
    const container = adRef.current
    if (!container || !unit) return
    const callbackName = `recipeAdFail_${placement}_${unit.replace(/\W/g, '_')}`
    const callbacks = window as unknown as Record<string, unknown>
    const onFail = () => {
      container.dataset.adStatus = 'no-ad'
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[AdFit ${placement}] 광고 응답 없음 또는 요청 실패: ${unit}`)
      }
    }
    callbacks[callbackName] = onFail
    container.dataset.adStatus = 'loading'

    // Defer the SDK request so Strict Mode's discarded effect never loads an ad.
    const timer = window.setTimeout(() => {
      container.innerHTML = `
      <ins
        class="kakao_ad_area"
        style="display:none"
        data-ad-unit="${unit}"
        data-ad-onfail="${callbackName}"
        data-ad-width="${width}"
        data-ad-height="${height}">
      </ins>
    `

      const script = document.createElement('script')
      script.src = 'https://t1.kakaocdn.net/kas/static/ba.min.js'
      script.async = true
      script.charset = 'utf-8'
      script.onerror = () => {
        container.dataset.adStatus = 'script-error'
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[AdFit ${placement}] 광고 스크립트 로드 실패: ${unit}`)
        }
      }

      container.appendChild(script)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      // Release the previous placement before the same unit is used on a new page.
      window.adfit?.destroy?.(unit)
      if (callbacks[callbackName] === onFail) delete callbacks[callbackName]
      container.replaceChildren()
    }
  }, [pathname, unit, width, height, placement])

  if (!unit) return null
  return (
    <div
      ref={adRef}
      data-kakao-ad-slot={placement}
      className="w-full overflow-hidden"
      style={{ maxWidth: width }}
    />
  )
}
