export default function IngredientProducts({ products }: { products: string }) {
  const links: { title: string; link: string }[] = JSON.parse(products)
  return (
    <aside
      aria-label="레시피 관련 상품"
      className="not-prose my-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-900"
    >
      <p className="mb-2 text-sm font-semibold">재료 준비할 때 참고하세요</p>
      {links.map(({ title, link }) => (
        <a
          key={link}
          href={link}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="text-primary-700 dark:text-primary-300 flex min-h-11 items-center py-2 text-sm leading-6 underline underline-offset-4"
        >
          {title} 보기 ↗
        </a>
      ))}
      <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
        쿠팡파트너스 활동의 일환으로, 구매 시 일정액의 수수료를 제공받습니다.
      </p>
    </aside>
  )
}
