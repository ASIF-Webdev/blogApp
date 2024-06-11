import React, { useId } from 'react'

const Input = React.forwardRef( function Input({
    lable,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId()
    return (
      <div>
        {lable && 
        <lable htmlFor={id}>
          {lable}
        </lable>}

        <input 
            type={type} 
            className={`${className}`}
            ref={ref}
            {...props}
            id={id}
        />
      </div>
    )
  }
)

export default Input