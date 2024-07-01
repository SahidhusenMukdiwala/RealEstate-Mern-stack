import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

    <form className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt="Profile" className='w-24 h-24 self-center cursor-pointer border border-red-700 rounded-full hover:shadow-2xl'/>
      <input type="text" required placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' />
      <input type="email" required placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' />
      <input type="password" required maxLength={20} minLength={6} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='passwor' />
      <button className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'> 
        Update User
      </button>
      <button className='bg-green-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'> 
      Create Listing 
      </button>
    </form>

    <div className="flex gap-2 justify-between mt-5">
     <span className='text-red-700 cursor-pointer'>Delete Account</span>
     <span className='text-red-700 cursor-pointer'>Sign Out </span>
    </div>
  </div>
  )
}

export default Profile