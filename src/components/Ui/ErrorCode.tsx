interface ErrorCodeProps {
  readonly className?: string
  readonly code?: string
  readonly message?: string
  readonly fullScreen?: boolean
}

export default function ErrorCode({ className, code, message, fullScreen }: ErrorCodeProps) {
  const defaultCode = '404'
  const defaultMessage = "THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST."

  const classes = fullScreen ? 'min-h-screen flex flex-col justify-center items-center' : ''

  return (
    <div className={`container mx-auto w-full py-10 px-4 text-center ${classes} ${className}`}>
      <div className="text-9xl font-bold">{code ?? defaultCode}</div>
      <p className="mt-6">{message ?? defaultMessage}</p>
    </div>
  )
}