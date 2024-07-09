import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import { toast } from 'react-toastify'

function SignIn() {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const HandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setRole(value);
    setFormData({
      ...formData,
      role: value
    });
  };


  const navigate = useNavigate()
  const HandleSubmit = async (e) => {
    e.preventDefault()
    console.log("role is :-",role)
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
        <div className="flex flex-col gap-4">
          <label>User Type:</label>
          <select
            name="role"
            id='role'
            value={role}
            onChange={handleRoleChange}
            // onChange={(e) => setRole(e.target.value)}
            required
            className='w-full'
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {role === 'agent' && (
          <>
            <div className='w-full'>
              <label>Phone:</label>
              <input className='w-full border p-3'
              placeholder='Enter phone number'
                type="number"
                name="phone"
                id='phone'
                onChange={HandleChange}
                required={role === 'agent'}
              />
            </div>
            <div>
              <label>License Number:</label>
              <input className='w-full border p-3'
              placeholder='Enter License Number'
                type="number"
                name="licenseNumber"
                id='licenseNumber'
                onChange={HandleChange}
                required={role === 'agent'}
              />
            </div>
            <div>
              <label>Agency:</label>
              <input
              className='w-full border p-3'
              placeholder='Enter Agency Name'
                type="text"
                name="agency"
                id='agency'
                onChange={HandleChange}
                required={role === 'agent'}
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
              className='w-full border p-3'
              placeholder='Enter Your Bio'
                name="bio"
                id='bio'
                onChange={HandleChange}
                required={role === 'agent'}
              ></textarea>
            </div>
          </>
        )}

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