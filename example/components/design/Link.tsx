import classNames from 'clsx'

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {}

export const Link: React.FC<LinkProps> = (props) => {
  const { children, className, ...rest } = props

  return (
    <a
      className={classNames(
        'text-green-800 hover:underline dark:text-green-400',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}
