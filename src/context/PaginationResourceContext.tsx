import { ReactNode, createContext, useMemo, useState } from 'react';

export interface PaginationResource {
  readonly endpoint: string
  readonly resource: Pagination<any> | null
  readonly isLoading: boolean
  setResource: React.Dispatch<React.SetStateAction<Pagination<any>>>
  fetch: (callback: CallableFunction) => void
}

const INITIAL_VALUE: PaginationResource = {
  endpoint: '',
  resource: null,
  isLoading: false,
  setResource: () => { },
  fetch: () => { }
}

export const PaginationResourceContext = createContext(INITIAL_VALUE)

interface PaginationResourceProviderProps {
  readonly children?: ReactNode
  readonly resource?: any
  readonly endpoint: string
}

export function PaginationResourceProvider(props: PaginationResourceProviderProps) {
  const [resource, setResource] = useState<Pagination<any>>(props.resource)
  const [isLoading, setIsLoading] = useState(false)

  async function fetch(callback: CallableFunction) {
    setIsLoading(true)

    await callback()

    setIsLoading(false)
  }

  const value = useMemo(() => {
    return {
      resource,
      isLoading,
      endpoint: props.endpoint,
      setResource,
      fetch
    }
  }, [isLoading, props.endpoint, resource])

  return (
    <PaginationResourceContext.Provider value={value}>
      {props.children}
    </PaginationResourceContext.Provider >
  )
}