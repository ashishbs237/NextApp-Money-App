import React from 'react'

const SKHeader = ({ text, children = <></> }) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className="text-xl font-bold mb-3">{text}</h1>
      {children}
    </div>
  )
}

export default SKHeader