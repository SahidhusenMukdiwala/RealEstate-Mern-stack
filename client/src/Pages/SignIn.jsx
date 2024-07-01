import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../redux/userSlice.js'
import GoogleAuth from './GoogleAuth.jsx'

function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        }
      )
      const data = await res.json()

      console.log(data)
      if (!res.ok) {
        dispatch(signInFailure(data.message))
        return
      }

      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" required placeholder='email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={HandleChange} />
        <input type="password" required maxLength={20} minLength={8} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={HandleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>{loading ? 'Loading...' : ' Sign In'}</button>
        <GoogleAuth/>
      </form>

      <div className="flex gap-2 justify-center mt-3">
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'} className='font-bold'><span className='text-blue-700'>sign Up</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn