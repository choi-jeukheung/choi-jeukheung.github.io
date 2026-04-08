'use client'

import { useEffect, useState } from 'react'

const YouTubeShorts = ({ videoId }: { videoId: string }) => {
  const [isMounted, setIsMounted] = useState(false)

  // 하이드레이션 오류 방지
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="mx-auto my-12 max-w-[350px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-gray-100 shadow-2xl dark:border-gray-800">
        <div className="aspect-[9/16] w-full animate-pulse bg-gray-200" />
      </div>
    )
  }

  // 배포 환경에서 차단을 막기 위한 origin 설정
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="mx-auto my-12 max-w-[350px] overflow-hidden rounded-[2.5rem] border-[6px] border-gray-900 bg-black shadow-2xl dark:border-gray-800">
      <div className="relative aspect-[9/16]">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          // src 주소에 origin과 보안 옵션을 직접 붙여줍니다.
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${origin}&rel=0&modestbranding=1&vq=hd1080`}
          title="YouTube Shorts player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default YouTubeShorts
