import React from 'react'
import { useSelector } from 'react-redux'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { signInFailure, signInSuccess } from '../redux/userSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function GoogleAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      console.log(result)
      console.log({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})

      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
      });
      const data = await res.json();

      console.log(data)

      if(data.success === false){
        dispatch(signInFailure(data));
        return
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log("not sign In with Google",error.message)
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
      Sign In With Google
    </button>
  )
}

export default GoogleAuth