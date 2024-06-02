import { useState } from "react"
import api from "../utils/api"

export default function useResource<T>(repository: any) {
  const [resource, setResource] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  // const [page, setPage] = useState(1)
  // const [sort, setSort] = useState("id")

  async function fetch() {
    setIsLoading(true)

    await repository.index().then((data: any) => {
      setResource(data)
    }).catch(() => { })

    setIsLoading(false)
  }

  async function handlePaginate(url: string | null) {
    if (!url) return

    setIsLoading(true)

    await api.get(url).then((resource) => {
      setResource(resource.data)
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