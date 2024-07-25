import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { DeleteUserFailure, DeleteUserStart, DeleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/userSlice'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ListingCard from '../Components/Card/ListingCard'
function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)
  // console.log(currentUser)
  const userId = currentUser?.data?._id;
  const userRole = currentUser?.data?.role;
  const userName = currentUser?.data?.username;
  const UserEmail = currentUser?.data?.email;
  const UserPass = currentUser?.data?.password;
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileUploaderror, setFileError] = useState(false)
  const [formData, setFormData] = useState({})
  const [tab, setTab] = useState('profile')
  // const [listData, setListData] = useState([])
  const dispatch = useDispatch()

  console.log("Percentage done :- ", filePercentage)
  console.log(fileUploaderror)

  // firebasse storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && 
  // request.resource.contentType.matches('images/.*')

  console.log("userId", userId)
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
            // console.log("Download Url", downloadURL)
            // console.log("setformdata",setFormData)
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
      const res = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE'
      });

      const data = res.json();

      if (data.success === false) {
        dispatch(DeleteUserFailure(data.message))
        toast.error(data.message)
        return
      }
      dispatch(DeleteUserSuccess(data.message))
      toast.success("User deleted successfully")
      // res.status(200).json({success:true,message: "delete successfully  "});
    } catch (error) {
      dispatch(DeleteUserFailure(error.message))
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        toast.error(data.message)
      }
      dispatch(updateUserSuccess(data.message))
      toast.success("User updated successfully")
    } catch (error) {
      toast.error(error.message)
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
        toast.error(data.message)
        return
      }
      dispatch(signOutUserSuccess(data))
      toast.success("Sign out successfully")
      console.log(res)

    } catch (error) {
      toast.error(error.message)
      dispatch(signOutUserFailure(error.message))
    }
  }


  const [bookings, setBooking] = useState([])
  console.log("booking Data", bookings)

  const address = bookings?.data?.address
  console.log("description", address)

  const getallBookings = async () => {

    try {
      const res = await fetch('/api/user/bookings/my-properties')

      const result = await res.json();
      console.log("result", result)

      if (!res.ok) {
        return toast.error(res.message);
      }
      console.log("Set Booking", setBooking(result))
      setBooking(result)

    } catch (error) {
      toast.error(error.message)
    }


  }

  useEffect(() => {
    getallBookings();
  }, []);


  return (
    <div className=''>
      <div className="p-3 max-w-lg mx-auto flex items-center justify-center ">
        <button onClick={() => setTab('profile')} className={`${tab === 'profile' && 'bg-blue-700 text-white font-medium'} p-4 mr-5 px-5 rounded-md text-headingColor font-semibold leading-7 text-[17px] border border-solid border-primaryColor`}>Profile</button>
        <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' && 'bg-blue-700 text-white font-medium'} p-4 mr-5 px-5 rounded-md text-headingColor font-semibold leading-7 text-[17px] border border-solid border-primaryColor`}>Booking</button>
      </div>

      {
        tab === 'profile' && (
          <div className='max-w-lg p-3 mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

              <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden id="" ref={fileRef} accept='image/*' />

              <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser?.data?.avatar} alt="Profile" className='w-24 h-24 self-center cursor-pointer border border-red-700 rounded-full hover:shadow-2xl' />

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
              <h1 className='text-center my-3 font-mono uppercase'>{userName} ({userRole})</h1>
              <input defaultValue={userName} type="text" placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={hadnleChange} />
              <input disabled defaultValue={UserEmail} type="email" placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={hadnleChange} />
              <input disabled defaultValue={UserPass} type="password" maxLength={20} minLength={6} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='passwor' onChange={hadnleChange} />
              <button onChange={handleSubmit} className='bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
                Update User
              </button>
              {
                userRole === 'agent' ? (
                  <Link to={'/create-listing'} className='bg-green-700 text-center text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>
                    Create Listing
                  </Link>
                ) : ""
              }

            </form>

            <div className="flex gap-2 justify-between mt-5">
              <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
              <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out </span>
            </div>
          </div>
        )
      }

      {
      tab === 'bookings' && (
        <div>
          <h1 className='text-center font-serif text-2xl'>My Bookings</h1>
          
            <div className="flex flex-wrap items-center gap-4 mt-5">
              {bookings.map((booking) => (
                <ListingCard listings={booking} key={booking._id}/>
              ))
              }
            </div>
          </div>
      
      )
      }


    </div>


  )
}

export default Profile