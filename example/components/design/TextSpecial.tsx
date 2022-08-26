import classNames from 'clsx'

export interface TextSpecialProps
  extends React.ComponentPropsWithoutRef<'span'> {}

export const TextSpecial: React.FC<TextSpecialProps> = (props) => {
  const { children, className, ...rest } = props

  return (
    <span
      className={classNames('text-green-800 dark:text-green-400', className)}
      {...rest}
    >
      {children}
    </span>
  )
}
