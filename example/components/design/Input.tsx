import classNames from 'clsx'

import { FormState } from './FormState'

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  label: string
  error?: string
  className?: string
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, name, className, error, ...rest } = props

  return (
    <div className='flex flex-col'>
      <div className={classNames('mt-6 mb-2 flex justify-between', className)}>
        <label className='pl-1' htmlFor={name}>
          {label}
        </label>
      </div>
      <div className='relative mt-0'>
        <input
          className='h-11 w-full rounded-lg border border-transparent bg-[#f1f1f1] px-3 font-paragraph leading-10 text-[#2a2a2a] caret-green-600 focus:border focus:shadow-green focus:outline-none'
          {...rest}
          id={name}
          name={name}
          data-cy={`input-${name ?? 'name'}`}
        />
        <FormState
          id={`error-${name ?? 'input'}`}
          state={error == null ? 'idle' : 'error'}
          message={error}
        />
      </div>
    </div>
  )
}
