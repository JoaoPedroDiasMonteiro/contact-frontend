import { ClockIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface UserCardProps {
  readonly user: User
}

export default function UserCard({ user }: UserCardProps) {

  return (
    <div className="rounded-3xl p-8 ring-1 ring-gray-200">
      <p className="text-lg font-semibold leading-8 text-gray-900">{user.name} #{user.id}</p>
      <p className="mt-4 text-sm leading-6 text-gray-600">{user.email}</p>
      <p className="mt-4 text-sm leading-6 text-gray-600">
        <ClockIcon className='w-5 inline-block' />
        {' '}
        {new Date(user.created_at).toLocaleDateString()}
      </p>
    </div>
  )
}
