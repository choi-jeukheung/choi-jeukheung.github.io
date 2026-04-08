'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-10 w-10" />

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative ml-4 flex h-10 w-20 items-center rounded-full bg-gray-100 p-1 transition-all duration-500 hover:ring-4 hover:ring-orange-500/20 dark:bg-gray-800"
      aria-label="Toggle Theme"
    >
      {/* 배경 텍스트 (고메.zip 감성) */}
      <div className="absolute inset-0 flex w-full items-center justify-between px-2.5 text-[10px] font-black tracking-tighter uppercase">
        <span className={resolvedTheme === 'dark' ? 'text-gray-500' : 'text-orange-600'}>
          Light
        </span>
        <span className={resolvedTheme === 'dark' ? 'text-orange-400' : 'text-gray-400'}>Dark</span>
      </div>

      {/* 움직이는 원 (Slider) */}
      <div
        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-orange-500 ${
          resolvedTheme === 'dark' ? 'translate-x-10 rotate-[360deg]' : 'translate-x-0'
        }`}
      >
        {resolvedTheme === 'dark' ? (
          <span className="text-lg">🌙</span>
        ) : (
          <span className="text-lg">☀️</span>
        )}
      </div>
    </button>
  )
}

export default ThemeSwitch
