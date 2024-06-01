import { useContext } from "react";
import { PaginationResourceContext, PaginationResource as  BasePaginationResource } from '../context/PaginationResourceContext';

interface PaginationResource<T> extends BasePaginationResource {
  resource: Pagination<T> | null
}

export default function usePaginationResource<T>() {
  const context: PaginationResource<T> = useContext(PaginationResourceContext)

  return context
}