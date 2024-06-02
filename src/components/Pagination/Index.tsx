import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { useMemo } from 'react'
import PaginationLinks from './PaginationLinks'

interface PaginationProps {
  readonly meta: PaginationMeta,
  readonly navigate: (url: string | null) => void
}

export default function Pagination({ meta, navigate }: PaginationProps) {
  const links = useMemo(() => {
    return meta.links.filter((link) => {
      return isNaN(Number(link.label))
    }) ?? []
  }, [meta])

  const hasPagination = useMemo(() => {
    return links[0]?.url ?? links[1]?.url
  }, [links])

  return (
    <>
      {hasPagination && (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            {links[0] && (
              <button
                onClick={() => navigate(links[0].url)}
                disabled={!links[0].url}
                className="disabled:cursor-not-allowed inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
              </button>
            )}
          </div>

          <PaginationLinks meta={meta} navigate={navigate} />

          {links[1] && (
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <button
                onClick={() => navigate(links[1].url)}
                disabled={!links[1].url}
                className="disabled:cursor-not-allowed inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Next
                <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              </button>
            </div>
          )}
        </nav>
      )}
    </>
  )
}
