import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { toast } from 'react-toastify'

function SignIn() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)

  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const navigate = useNavigate()
  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )
      const result = await res.json()
      console.log(result)
      if (!res.ok) {
        toast.error(result.message)
        alert(result.error)
      }
      setLoading(false)
    toast.success(result.message)
    navigate('/sign-in')
  } catch (error) {
      toast.error(error.message)
      alert(error.message)
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>

      <form onSubmit={HandleSubmit} className='flex flex-col gap-4'>
        <input type="text" required placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={HandleChange} />
        <input type="email" required placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={HandleChange} />
        <input type="password" required maxLength={20} minLength={6} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={HandleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
          {
            loading ? 'Loading...' : ' Sign Up'
          }</button>
        <GoogleAuth />
      </form>

      <div className="flex gap-2 justify-center mt-3">
        <p>Have an account?</p>
        <Link to={'/sign-in'} className='font-bold'><span className='text-blue-700'>sign in</span></Link>
      </div>
    </div>
  )
}

export default SignIn