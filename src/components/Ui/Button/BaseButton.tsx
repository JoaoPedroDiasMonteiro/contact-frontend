import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly loading?: boolean
}

export default function BaseButton({ className, children, loading, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold
        leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-indigo-600
        gap-2 items-center disabled:opacity-80 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={loading}
      {...rest}
    >
      {children}
      {' '}
      {loading && (
        <svg className="animate-spin h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </button>
  )
}
