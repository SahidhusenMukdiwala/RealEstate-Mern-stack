import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo.jpg'
export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to='/'>
          <img src={Logo} className='w-28 h-28' alt="Logo" />
        </Link>

        <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search ..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-600' />
        </form>

        <ul className='flex gap-4'>
          <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
          <Link to='/about'> <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
          <Link to='/profile'>{
            currentUser ? (
              <img className='rounded-full w-7 h-7 object-cover' src={currentUser.avatar} alt="" />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )
          }
          </Link>

        </ul>
      </div>
    </header>
  )
}
