import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import useResource from "../../hooks/useResource";
import Pagination from '../Pagination/Index';
import LoadingIndicator from "../Ui/LoadingIndicator";
import ContactRepository from "../../repository/ContactRepository";
import ContactEdit from "./ContactEdit";
import ContactCreate from "./ContactCreate";
import EmptyStateMessage from "../Ui/EmptyStateMessage";
import ContactDelete from "./ContactDelete";

interface ContactListingProps {
  readonly userId: number
}

export default function ContactListing({ userId }: ContactListingProps) {
  const [showEdit, setShowEdit] = useState(false)
  const [contact, setContact] = useState<Contact>()

  const contactResource = useResource<Pagination<Contact>>(ContactRepository, [userId])

  useEffect(() => {
    contactResource.fetch()
  }, []) // eslint-disable-line

  function openEdit(contact: Contact) {
    setContact(contact)
    setShowEdit(true)
  }

  function closeEdit() {
    setShowEdit(false)
  }

  return (
    <>
      {contact && (
        <ContactEdit open={showEdit} contact={contact} closeOpen={closeEdit} afterSubmit={contactResource.fetch} />
      )}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">User Contacts</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <ContactCreate userId={userId} afterSubmit={contactResource.fetch} />
          </div>
        </div>
        <div className="mt-2 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="relative min-h-56">
                {contactResource.isLoading && (
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
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Value
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {contactResource.resource?.data.map((contact) => (
                      <tr key={contact.id}>
                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                          {contact.id}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                          {contact.type}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                          {contact.value}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap space-x-2 py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <ContactDelete userId={userId} contactId={contact.id} afterSubmit={contactResource.fetch} />
                          <button onClick={() => openEdit(contact)} className="text-indigo-600 hover:text-indigo-900">
                            Edit <span className="sr-only">, {contact.id}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!contactResource.isLoading && !contactResource.resource?.data.length && (
                  <EmptyStateMessage />
                )}
                {contactResource.resource && (
                  <Pagination meta={contactResource.resource.meta} navigate={contactResource.handlePaginate} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
