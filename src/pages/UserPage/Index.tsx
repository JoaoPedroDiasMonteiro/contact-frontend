import React from "react"
import { Await, useLoaderData } from 'react-router-dom'
import LoadingIndicator from "../../components/Ui/LoadingIndicator"
import ErrorCode from "../../components/Ui/ErrorCode"
import UserCard from '../../components/User/UserCard';
import ContactListing from "../../components/Contact/ContactListing";

export function UserPage() {
  const { user } = useLoaderData() as { user: User }

  return (
    <div className="bg-white">
      <React.Suspense fallback={(<div className='min-h-screen'>
        <LoadingIndicator />
      </div>
      )}>
        <Await resolve={user} errorElement={<ErrorCode fullScreen code="404" />}>
          {(user) => (
            <div className="mx-auto container px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <UserCard user={user} />
              <div className="mt:6 lg:mt-0 col-span-2 rounded-3xl py-7 px-2 ring-1 ring-gray-200">
                <ContactListing userId={user.id} />
              </div>
            </div>
          )}
        </Await>
      </React.Suspense>
    </div>
  )
}
