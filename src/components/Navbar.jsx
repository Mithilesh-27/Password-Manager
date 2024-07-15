import React from 'react'
import { memo } from 'react'

const Navbar = () => {
    return (
        <nav className='w-full h-20 flex justify-between px-12 md:px-20 items-center'>
            <div className="title flex items-center">
                <h1 className='font-bold text-3xl text-green-600'>&lt;</h1>
                <h1 className='font-bold text-3xl text-white'>Lock</h1>
                <h1 className='font-bold text-3xl text-green-600'>Box /&gt;</h1>
            </div>
            <button className="github hover:bg-gray-950 p-2 rounded-full cursor-pointer transition-all duration-200" title='Github'>
                <a href="https://github.com/Mithilesh-27/Password-Manager" target='_blank'><img src="/github.svg" alt="github-icon" className='invert w-8' /></a>
            </button>
        </nav>
    )
}

export default memo(Navbar)
