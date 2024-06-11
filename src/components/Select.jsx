import React, {useId} from 'react'

function Select({
    option,
    lable,
    className='',
    ...props
}, ref) {
    const id = useId()

  return (
    <div>
        {lable &&
        <lable htmlFor={id} className>
            {lable}
        </lable>
        }
        <select
            {...props}
            id={id}
            ref={ref}
            className={`${className}`}
        >
            {option?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)