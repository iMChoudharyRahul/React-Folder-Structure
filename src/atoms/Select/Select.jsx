import React, { forwardRef, userId } from 'react'

function Select({
    options = [],
    label,
    className="",
    ...props
}, ref){
    const id = userId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''>
        {label}
        </label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map(selectOption => (
                <option key={selectOption} value={selectOption}>{selectOption}</option>
            ))}

        </select>
    </div>
  )
}

export default forwardRef(Select)
