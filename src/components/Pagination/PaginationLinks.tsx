import { useMemo } from "react"

interface PaginationPagesProps {
  readonly meta: PaginationMeta
}

export default function PaginationLinks({ meta }: PaginationPagesProps) {
  const links = useMemo(() => {
    return meta.links.filter((link) => {
      return !isNaN(Number(link.label))
    })
  }, [meta])

  return (
    <div className="hidden md:-mt-px md:flex">
      {links.map(link => (
        <button
          key={link.label}
          className={`
            inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium
            ${link.active ?
              'border-indigo-500 text-indigo-600' :
              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
           }
        `}
          aria-current="page"
        >
          {link.label}
        </button>
      ))}
    </div>
  )
}
