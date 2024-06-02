import { useState } from "react"
import getParameterFromUrl from "../utils/getParameterFromUrl"

export default function useResource<T>(repository: any) {
  const [resource, setResource] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState<number | null>(null)
  // const [sort, setSort] = useState("id")

  async function fetch() {
    setIsLoading(true)
    fetchResource(page)
    setIsLoading(false)
  }

  async function handlePaginate(url: string | null) {
    if (!url) return

    const page = getParameterFromUrl(url, 'page') as number | null
    setPage(page)
    fetchResource(page)
  }

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