import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import {DeleteUserFailure,DeleteUserStart, DeleteUserSuccess,updateUserFailure, updateUserStart, updateUserSuccess,signOutUserStart,signOutUserSuccess,signOutUserFailure } from '../redux/userSlice'
import { Link } from 'react-router-dom'
function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploaderror, setFileError] = useState(false)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  console.log(formData)
  console.log("Percentage done :- ", filePercentage)
  console.log(fileUploaderror)
  console.log("name", currentUser.name)
  // firebasse storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('images/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    console.log("upload Task", uploadTask)
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },

      (error) => {
        setFileError(true)
      },

      () => {
        console.log("Start")
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL },
            console.log("Download Url", downloadURL)
          )
        );
      }
    );
  };

  const hadnleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log("User :- ", currentUser.avatar)
    console.log("UserId :- ", currentUser)
  }

  const handleDelete = async () => {
    dispatch(DeleteUserStart())
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });

      const data = res.json();

      if (data.success === false) {
        dispatch(DeleteUserFailure(data.message))
        return
      }
      dispatch(DeleteUserSuccess(data.message))
      // res.status(200).json({success:true,message: "delete successfully  "});
    } catch (error) {
      alert(error.message)

      dispatch(DeleteUserFailure(error.message))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("UserId :- ", currentUser)
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data.message))
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }
      dispatch(signOutUserSuccess(data))
      console.log(res)
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden id="" ref={fileRef} accept='image/*' />

        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className='w-24 h-24 self-center cursor-pointer border border-red-700 rounded-full hover:shadow-2xl' />

        <p className='text-sm self-center'>
          {fileUploaderror ?
            (<span className='text-red-700'>Error Image upload (image must less then 2 mb)</span>) :
            filePercentage > 0 && filePercentage < 100 ? <span className='text-slate-700'>
              {`Uploading ${filePercentage} %`}
            </span> :
              filePercentage === 100 ? (<span className='text-green-500'>
                Successfully Uploaded
              </span>) :
                " "
          }
        </p>
        <input defaultValue={currentUser.email} type="text" placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={hadnleChange} />
        <input defaultValue={currentUser.username} type="email" placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={hadnleChange} />
        <input defaultValue={currentUser.password} type="password" maxLength={20} minLength={6} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='passwor' onChange={hadnleChange} />
        <button onChange={handleSubmit} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
          Update User
        </button>
        <Link to={'/create-listing'} className='bg-green-700 text-center text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
          Create Listing
        </Link>
      </form>

      <div className="flex gap-2 justify-between mt-5">
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out </span>
      </div>
    </div>
  )
}

export default Profile