import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import classNames from '../../../utils/classNames'
import { useMemo } from 'react'

interface SelectProps {
  readonly items: any[],
  readonly value: any,
  readonly name: string
  readonly label: string
  readonly onChange: (value: any) => void,
  readonly error?: null | string;
  readonly key?: string
}

export default function Select({ items, value, onChange, label, name, error, key = 'id' }: SelectProps) {
  function handleOnChange(value: any) {
    onChange({
      target: {
        id: null,
        name,
        value: value[key]
      }
    })
  }

  const selected = useMemo(() => {
    return items.find(item => item[key] === value);
  }, [value, items, key])

  const boxClasses = useMemo(() => {
    const base = 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left  shadow-sm ring-1 ring-inset  focus:outline-none focus:ring-2  sm:text-sm sm:leading-6'
    const normal = 'text-gray-900 ring-gray-300 focus:ring-indigo-600'
    const withError = 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'

    if (error) {
      return `${base} ${withError}`
    }

    return `${base} ${normal}`
  }, [error])

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label>
          <div className="relative mt-2">
            <ListboxButton className={boxClasses}>
              <span className="block truncate">{selected[name]}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <ListboxOption
                    key={item[key]}
                    className={({ focus }) =>
                      classNames(
                        focus ? 'bg-indigo-600 text-white' : '',
                        !focus ? 'text-gray-900' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item[name]}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              focus ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>

            {error && (
              <p className="mt-2 text-sm text-red-600" id={`${label}-error`}>
                {error}
              </p>
            )}
          </div>
        </>
      )}
    </Listbox>
  )
}
