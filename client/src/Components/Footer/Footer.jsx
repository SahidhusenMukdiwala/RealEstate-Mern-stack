import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.jpg'
import { FaSquareFacebook, FaSquareGithub, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
export default function Footer() {
  return (
    <div className='Footer bg-gray-700 text-white shadow-lg mt-6 mb-4'>
      <div className=" sm:flex sm:flex-wrap sm:justify-between  ">
        <div className="Logo p-7">
          <Link to='/'>
            <img src={Logo} className='w-[60px] h-[60px] rounded-[50%] transition ease-in-out delay-150 hover:cursor-pointer hover:rounded-[10%] hover:scale-[1.1] hover:overflow-hidden duration-300 sm:h-[100px] sm:w-[100px]' alt="Logo" />
          </Link>
        </div>

        <div className="Links p-7">
          <h1 className='font-bold text-2xl '>Search Pages:- </h1>
          <ul className='mt-5'>
            <li className='text-[17px] hover:underline font-semibold leading-8' ><Link to={'/search?offers=true'}>Offers</Link></li>
            <li className='text-[17px] hover:underline font-semibold leading-8' ><Link to={'/search?type=sale'}>Sale</Link></li>
            <li className='text-[17px] hover:underline font-semibold leading-8' ><Link to={'/search?type=rent'}>Rent</Link></li>
          </ul>
        </div>

        <div className="Social Media p-7">
          <h1 className='font-bold text-2xl '>Follow Us:- </h1>
          <ul className='mt-5 flex items-center gap-3'>
            <li className='text-[20px] hover:underline font-semibold' ><Link to={'#'}><FaSquareInstagram/></Link></li>
            <li className='text-[20px] hover:underline font-semibold' ><Link to={'#'}><FaSquareFacebook/></Link></li>
            <li className='text-[20px] hover:underline font-semibold' ><Link to={'#'}><FaSquareGithub/></Link></li>
            <li className='text-[20px] hover:underline font-semibold' ><Link to={'#'}><FaSquareYoutube/></Link></li>
          </ul>
        </div>

        <div className="Company p-7">
          <h1 className='font-bold text-2xl '>Company :- </h1>
          <ul className='mt-5 gap-3 leading-8'>
            <li className='text-[17px] font-semibold' ><Link to={'/about'}>About Us</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'/Testo'}>Testomonial</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'#'}>Term & Condition</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'#'}>Feedback</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'#'}>Report a Problem</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'#'}>Privacy Policy</Link></li>
            <li className='text-[17px] font-semibold' ><Link to={'#'}>Safty Guidence</Link></li>
          </ul>
        </div>

        <div className="Contect-Us p-7 flex flex-col gap-5">
          <h1 className='font-bold text-2xl '>Contect Us :- </h1>
        
        <div className="">
          <h5 className='font-semibold text-xl'>Toll Free - 8546785123</h5>
          <p className='text-sm'>9:30 AM to 6:30 PM (Mon-Sun)</p>
        </div>
        <div className="">
          <h5 className='font-semibold text-xl'>Email - abc@gmail.com</h5>
        </div>
        </div>
      </div>

      <p className='text-lg font-semibold text-center p-3'>All Copy Right Reserved © Sahidhusen Mukdiwala 2024.</p>
    </div>
  )
}
