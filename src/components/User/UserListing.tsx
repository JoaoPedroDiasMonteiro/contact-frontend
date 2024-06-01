import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useEffect } from "react"
import usePaginationResource from "../../hooks/usePaginationResource"
import UserRepository from "../../repository/UserRepository"
import Pagination from "../Pagination/Index"
import LoadingIndicator from "../Ui/LoadingIndicator"
import UserCreate from "./UserCreate"

export default function UserListing() {
  const context = usePaginationResource<User>()

  useEffect(() => {
    context.fetch(async () =>
      await UserRepository.index().then((users) => {
        context.setResource(users)
      }).catch(() => { })
    )
  }, []) // eslint-disable-line

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and contacts.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <UserCreate />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative min-h-56">
              {context.isLoading && (
                <LoadingIndicator />
              )}
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <button className="group inline-flex">
                        Name
                        {' '}
                        <span className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Registered At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {context.resource?.data.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Edit <span className="sr-only">, {user.id}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
