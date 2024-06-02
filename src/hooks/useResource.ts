import { useCallback, useState } from "react"
import getParameterFromUrl from "../utils/getParameterFromUrl"

export default function useResource<T>(repository: any) {
  const [resource, setResource] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState<number | null>(null)
  // const [sort, setSort] = useState("id")

  const fetch = useCallback(async () => {
    fetchResource(page)
  }, [page]) // eslint-disable-line

  const handlePaginate = useCallback(async (url: string | null) => {
    if (!url) return

    const page = getParameterFromUrl(url, 'page') as number | null
    setPage(page)
    fetchResource(page)
  }, []) // eslint-disable-line

  async function fetchResource(page: number | null) {
    setIsLoading(true)
    await repository.index({ page }).then((data: any) => {
      setResource(data)
    }).catch(() => { })
    setIsLoading(false)
  }

  return {
    resource,
    isLoading,
    fetch: fetch,
    handlePaginate: handlePaginate
  }
}