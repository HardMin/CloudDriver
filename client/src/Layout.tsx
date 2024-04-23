import React from 'react'

interface LayoutType {
  children: React.ReactElement
  className?: string
}

export const Layout = ({ children, className }: LayoutType) => {
  return (
    <div className={`w-10/12 ${className} mx-auto `}>
      <header className='border-b h-14 flex items-center'>
        <h1>CloudDriver</h1>
      </header>

      <main className='my-8'>
        {children}
      </main>
    </div>
  )
}
