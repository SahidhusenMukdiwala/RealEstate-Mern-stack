import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo.jpg'
export default function Header() {
  const { currentUser } = useSelector(state => state.user)
  const userRole = currentUser?.data?.role;
  const [searchTerm,setSearchTerm] = useState('')
const navigate = useNavigate()
  const handleSeacrch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

    useEffect(() => {
     const urlParams = new URLSearchParams(location.search)
     const urlSearchTermUrl = urlParams.get('searchTerm');
     if (urlSearchTermUrl){
      setSearchTerm(urlSearchTermUrl)
     }
    }, [location.search])
    
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to='/'>
          <img src={Logo} className='w-[60px] h-[60px] rounded-[50%] transition ease-in-out delay-150 hover:cursor-pointer hover:rounded-[10%] hover:scale-[1.1] hover:overflow-hidden duration-300 sm:h-[100px] sm:w-[100px]' alt="Logo" />
        </Link>
{
  currentUser ? (
<form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search ..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <button onClick={handleSeacrch}>
          <FaSearch className='text-slate-600' />
          </button>
        </form>
  ) : ""
}
        

        <ul className='flex gap-4'>
          <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
          <Link to='/about'> <li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
          <Link to={`${userRole === 'agent' ? '/agents/profile/me' :'/users/profile/me'}`}>{
            currentUser ? (
              <img className='rounded-full w-7 h-7 object-cover' src={currentUser?.data?.avatar} alt="" />
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
