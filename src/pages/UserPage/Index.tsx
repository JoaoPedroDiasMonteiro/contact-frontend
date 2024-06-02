import React from "react"
import { Await, useLoaderData } from 'react-router-dom'
import LoadingIndicator from "../../components/Ui/LoadingIndicator"
import ErrorCode from "../../components/Ui/ErrorCode"

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
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              {user.id}
            </div>
          )}
        </Await>
      </React.Suspense>
    </div>
  )
}
