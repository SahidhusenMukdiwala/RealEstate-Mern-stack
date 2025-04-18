import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { DeleteUserFailure, DeleteUserStart, DeleteUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/userSlice'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Dashboard() {
    const fileRef = useRef(null)
    const { currentUser } = useSelector((state) => state.user)
    // console.log(currentUser)
    const userId = currentUser?.data?._id;
    const userRole = currentUser?.data?.role;
    const userDesc = currentUser?.data?.bio;
    const useragency = currentUser?.data?.agency;
    const [file, setFile] = useState(undefined)
    const [filePercentage, setFilePercentage] = useState(0)
    const [fileUploaderror, setFileError] = useState(false)
    const [formData, setFormData] = useState({})
    const [listData, setListData] = useState([])
    const dispatch = useDispatch()

    console.log("Percentage done :- ", filePercentage)
    console.log(fileUploaderror)
    const userName = currentUser?.data?.username;

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
            const res = await fetch(`/api/agent/agents/delete/${userId}`, {
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
            const res = await fetch(`/api/agent/agents/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = res.json();
            console.log(data)

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

    const handleShowList = async () => {
        console.log(userId)
        try {
            const res = await fetch(`/api/user/listings/${userId}`)
            const result = await res.json();
            if (!res.ok) {
                toast.error(res.message)
            }
            console.log(result)
            setListData(result)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const hadnleListingDelete = async (listingId) => {
        try {

            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            })
            const result = await res.json();
            if (!res.ok) {
                toast.error(res.message)
            }
            toast.success("Successfully deleted ...")
            setListData((prev) => prev.filter((listing) => listing._id !== listingId))
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
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

                <h1 className='text-center font-serif text-2xl uppercase'>{userName} ({userRole})</h1>
                <h1 className='text-center font-serif text-sm text-gray-600 uppercase'>{userDesc}</h1>
                <h1 className='text-center font-semibold text-sm text-black uppercase'>Agency :- {useragency}</h1>

                <input defaultValue={currentUser?.data?.username} type="text" placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={hadnleChange} />
                <input disabled defaultValue={currentUser?.data?.email} type="email" placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={hadnleChange} />
                <input disabled defaultValue={currentUser?.data?.password} type="password" maxLength={20} minLength={6} placeholder='password' className='border p-3 rounded-lg focus:outline-none' id='passwor' onChange={hadnleChange} />
                <input defaultValue={currentUser?.data?.phone} type="text" placeholder='Phone' className='border p-3 rounded-lg focus:outline-none' id='phone' onChange={hadnleChange} />
                <textarea defaultValue={currentUser?.data?.bio} placeholder='Bio' className='border p-3 rounded-lg focus:outline-none' id='bio' onChange={hadnleChange} />
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
            <button className='text-green-700 w-full font-bold text-2xl' onClick={handleShowList}>Show Listing</button>

            {
                listData && listData.length > 0 &&
                <div className="">
                    <h1 className='font-semibold text-4xl text-center mt-7'>Your Listing</h1>
                    {
                        listData.map((listing) => (<div key={listing._id} className="flex items-center justify-between border border-gray-800 rounded-lg p-3 mt-6">
                            <Link to={`/listing/${listing._id}`}>
                                <img className='w-16 h-16 object-contain hover:scale-105' src={listing.imageUrls[0]} alt="listImg" />
                            </Link>
                            <Link to={`/listing/${listing._id}`}>
                                <p className='text-slate-700 font-semibold  hover:opacity-75 hover:underline truncate flex-1'>{listing.name}</p>
                            </Link>
                            <div className=" flex flex-col font-semibold">
                                <button onClick={() => hadnleListingDelete(listing._id)} className='text-red-700'>Delete</button>
                                <Link to={`/updateListing/${listing._id}`}>
                                    <button className='text-green-700'>Edit</button>
                                </Link>
                            </div>
                        </div>

                        ))}
                </div>

            }
        </div>


    )
}

export default Dashboard