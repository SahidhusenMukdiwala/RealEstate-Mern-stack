import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function SignIn() {
  const [fromData, setFormData] = useState({})
  const HandleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.id]: e.target.value
    })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(fromData),
        credentials:'include',
      }
    )
    console.log(res)
    const result = await res.json()
    console.log(result)
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>

      <form onSubmit={HandleSubmit} className='flex flex-col gap-4'>
        <input type="text" required placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={HandleChange} />
        <input type="email" required placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={HandleChange} />
        <input type="password" required maxLength={10} minLength={3} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={HandleChange} />
        <button className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>Sign Up</button>
      </form>

      <div className="flex gap-2 justify-center mt-3">
        <p>Have an account?</p>
        <Link to={'/sign-in'} className='font-bold'><span className='text-blue-700'>sign in</span></Link>
      </div>
    </div>
  )
}

export default SignIn