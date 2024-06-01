import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { useCallback, useMemo } from 'react'
import usePaginationResource from '../../hooks/usePaginationResource'
import api from '../../utils/api'
import PaginationLinks from './PaginationLinks'

export default function Pagination() {
  const context = usePaginationResource()

  const navigate = useCallback((url: string | null) => {
    if (!url) return

    context.fetch(async () => {
      await api.get(url).then((resource) => {
        context.setResource(resource.data)
      }).catch(() => { })
    })
  }, [context])

  const links = useMemo(() => {
    return context.resource?.meta.links.filter((link) => {
      return isNaN(Number(link.label))
    }) ?? []
  }, [context.resource])

  return (
    <>
      {context.resource && (
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

          <PaginationLinks meta={context.resource.meta} navigate={navigate} />

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
