import React, { ComponentProps } from 'react'

interface EmptyStateMessageProps extends ComponentProps<'p'> {
  readonly message?: string
}

export default function EmptyStateMessage({ message = 'Nothing could be found :/', ...rest }: EmptyStateMessageProps) {
  return (
    <p className='text-center text-gray-600 font-medium my-2' {...rest}>{message}</p>
  )
}
