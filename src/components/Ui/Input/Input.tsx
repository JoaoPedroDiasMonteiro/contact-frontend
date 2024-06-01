import React, { useMemo } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: null | string;
}

export default function Input(props: InputProps) {
  const { label, className, error, ...rest } = props

  const inputClasses = useMemo(() => {
    const base = 'block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6'
    const normal = 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
    const withError = 'pr-10 text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'

    if (error) {
      return `${base} ${withError}`
    }

    return `${base} ${normal}`
  }, [error])

  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2 relative">
        <input
          id={label}
          name={label}
          className={`${className} ${inputClasses}`}
          {...rest}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${label}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
