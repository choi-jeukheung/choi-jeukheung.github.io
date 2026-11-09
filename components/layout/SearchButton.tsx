import Link from '@/components/ui/Link'

export default function SearchButton() {
  return (
    <Link
      href="/search/"
      aria-label="레시피 검색"
      className="flex h-11 w-11 items-center justify-center rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 dark:text-gray-200 dark:hover:bg-gray-800"
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </Link>
  )
}
