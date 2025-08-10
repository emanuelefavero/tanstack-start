import { cn } from '~/lib/utils'

interface Props extends React.ComponentProps<'button'> {
  className?: string
  children?: React.ReactNode
}

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'mt-2 cursor-pointer rounded-full border border-blue-300 bg-blue-200 px-2.5 py-1 font-semibold text-blue-800 transition-transform duration-200 hover:bg-blue-800 hover:text-blue-200 active:scale-95',
        className,
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  )
}
