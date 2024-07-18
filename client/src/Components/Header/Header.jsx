import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo.jpg'
import '../Header/Header.css'
import { BiMenuAltLeft } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6"


export default function Header() {

  const { currentUser } = useSelector(state => state.user)
  const userRole = currentUser?.data?.role;
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const headerRef = useRef(null)
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
    if (urlSearchTermUrl) {
      setSearchTerm(urlSearchTermUrl)
    }
  }, [location.search])

  const stickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      }
      else {
        headerRef.current.classList.remove('sticky__header')

      }
    })
  }

  useEffect(() => {
    stickyHeader()
    return window.addEventListener('scroll', stickyHeader)
  },)

  const menuRef = useRef(null)
  const toggleMenu = () => {
    menuRef.current.classList.toggle('show__menu')
    if (isOpen) {
      setIsOpen(false)
    }
    else {
      setIsOpen(true)
    }
  }

  const navLinks = [
    {
      path: '/',
      display: 'Home'
    },
    {
      path: '/about',
      display: 'About'
    },
    {
      path: '/ContectUs',
      display: 'ContectUs'
    },

  ]



  return (
    <header ref={headerRef} className='bg-slate-200 shadow-md '>
      <div className="flex items-center justify-between max-w-6xl mx-auto p-3">
        <Link to='/'>
          <img src={Logo} className='w-[60px] h-[60px] rounded-[50%] transition ease-in-out delay-150 hover:cursor-pointer hover:rounded-[10%] hover:scale-[1.1] hover:overflow-hidden duration-300 sm:h-[100px] sm:w-[100px]' alt="Logo" />
        </Link>
        {
          currentUser ? (
            <form action="" className='bg-slate-100 p-3 rounded-lg flex items-center'>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search ..' className='bg-transparent focus:outline-none w-24 sm:w-64' />
              <button onClick={handleSeacrch}>
                <FaSearch className='text-slate-600' />
              </button>
            </form>
          ) : ""
        }

        <div className="navigation flex items-center sm:gap-4">
          <div className="navigation duration-1000" ref={menuRef}>
            <ul className='flex items-center sm:gap-4' >
              {/* <Link to='/'><li id='home' className='hidden sm:inline text-slate-700 hover:underline' >Home</li></Link>
              <Link to='/about'> <li id='about' className='hidden sm:inline text-slate-700 hover:underline' >About</li></Link> */}

              {
                navLinks.map((link, index) => <li key={index}>
                  <NavLink to={link.path} className='hidden sm:inline text-slate-700 hover:underline'>{link.display}</NavLink>
                </li>)
              }
            </ul>

          </div>

          <div className="flex items-center gap-3">
            {
              currentUser ? (
                <span className='sm:hidden' onClick={toggleMenu}>
                  {isOpen ? <BiMenuAltLeft className='w-7 h-7 cursor-pointer' /> : <FaXmark className='w-7 h-7 cursor-pointer' />}

                </span>
              ) : ""
            }

            <Link to={`${userRole === 'agent' ? '/agents/profile/me' : '/users/profile/me'}`}>{
              currentUser ? (
                <img className='rounded-full w-7 h-7 object-cover' src={currentUser?.data?.avatar} alt="" />
              ) : (
                <li className='list-none text-slate-700 hover:underline'> Sign in</li>
              )
            }
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}
