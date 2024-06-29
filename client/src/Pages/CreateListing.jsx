// import { getDownloadURL } from 'firebase/storage'
// import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import {app} from 'firebase'
import React, { useState } from 'react'

// import { useSelector } from 'react-redux'

function CreateListing() {

    // const {currentUser} = useSelector(state => state.user)

    const [files, setFile] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: "",
        address: "",
        regularPrice: 50,
        discountPrice: 0,
        bathrooms: 1,
        bedrooms: 1,
        type: 'rent',
        offers: false,
        parking: false,
        furnished: false,
    })

    // console.log(formData)
    //     const handleImageSubmit =(e) => {
    //        if(files.length>0 && files.length<7){
    //         const promises = [];

    //         for (let i=0; i<files.length; i++){
    //             promises.push(storeImage(files[i]))
    // Promise.all(promises).then((urls)=>{
    //     setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});``
    // })
    //         }
    //        }
    //     }

    // const storeImage = async(file) => {
    //     return new Promise((resolve, reject) =>{
    //         const storage = getStorage(app)
    //         const fileName = new Date().getTime() + file.name
    //         const storageRef = ref(storage,fileName)
    //         const UploadTask = uploadBytesResumable(storageRef,file)
    //         UploadTask.on(
    //             "state_changed",
    //             (snapshot) =>{
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                 console.log(`Uploading is ${progress}% done`)
    //             },
    // (error) => {
    //     reject(error)
    // },
    // ()=>{
    //     getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) =>{
    //         resolvePath(downloadURL)
    //     })
    // }

    //         )
    //     })
    // }

    const handlechange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData, // keep previous information 
                type: e.target.id,
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offers') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if(formData.imageurls.length <0){
        //     return setError("You must upload two images")
        // }
        if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower then regular price')
        try {
            setLoading(true)
            setError(false)
            const res = fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await res.json()
            console.log("This is result", result)
            console.log('res', res)

            setLoading(false)

            if (!res.ok) {
                setError(result.message)
            }
            alert("Successfully Created")
        } catch (error) {
            // alert("catch error",error.message)
            setError(error.message)
        }
    }

    return (
        <main className='bg-gray-400 p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl text-center my-7 font-semibold'>Create Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>

                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" value={formData.name} placeholder='Name' id='name' maxLength='62' minLength='18' required className='border p-3 rounded-lg focus:outline-none' onChange={handlechange} />

                    <textarea onChange={handlechange} value={formData.description} type="text" placeholder='Description' id='description' required className='border p-3 rounded-lg focus:outline-none' />

                    <input onChange={handlechange} value={formData.address} type="text" placeholder='Address' id='address' required className='border p-3 rounded-lg focus:outline-none' />

                    {/* =============chechbox complete ================== */}
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" onChange={handlechange} checked={formData.type === 'sale'} name="sale" id="sale" className='w-5' />
                            <span>sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handlechange} checked={formData.type === 'rent'} type="checkbox" name="rent" id="rent" className='w-5' />
                            <span>rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handlechange} checked={formData.parking} type="checkbox" name="parking" id="parking" className='w-5' />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handlechange} checked={formData.furnished} type="checkbox" name="furnished" id="furnished" className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input onChange={handlechange} checked={formData.offers} type="checkbox" name="offers" id="offers" className='w-5' />
                            <span>Offers</span>
                        </div>
                    </div>

                    {/* =============chechbox complete ================== */}

                    {/* ==================== Second Section ================ */}
                    <div className="flex  gap-6">
                        <div className="flex flex-wrap items-center gap-2 ">
                            <p>Beds</p>
                            <input onChange={handlechange} value={formData.bedrooms} type="number" id="bedrooms" required placeholder='bedrooms' className='p-3 focus:outline-none rounded-lg border' max='10' min='1' />

                            <p>bathrooms</p>
                            <input onChange={handlechange} value={formData.bathrooms} type="number" id="bathrooms" required placeholder='Bathrooms' className='p-3 focus:outline-none rounded-lg border' max='10' min='1' />
                            <div className="flex flex-wrap items-center gap-2 ">
                                <div className="flex flex-col items-center">
                                    <p>RegularPrice</p>
                                    <span className='text-sm'>($/month)</span>
                                </div>
                                <input onChange={handlechange} value={formData.regularPrice} type="number" id="regularPrice" required placeholder='RegularPrice' className='p-3 focus:outline-none rounded-lg border' max='1000000' min='50' />
                            </div>
                            {
                                formData.offers &&
                                (
                                    <div className="flex flex-wrap items-center gap-2 ">
                                        <div className="flex flex-col items-center">
                                            <p>DiscountPrice</p>
                                            <span className='text-sm'>($/month)</span>
                                        </div>
                                        <input onChange={handlechange} value={formData.discountPrice} type="number" id="discountPrice" required placeholder='DiscountPrice' className='p-3 focus:outline-none rounded-lg border' min='0' max='10000000' />
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images : <span className='text-sm font-normal text-gray-600'>The first Image Will be the cover (max 6)</span> </p>
                    <div className="flex gap-4">
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='images/*' multiple onChange={(e) => { setFile(e.target.files) }} />
                        <button type='button'
                            // onClick={handleImageSubmit}
                            className='p-3  text-green-700 border  border-green-700 rounded hover:shadow-lg uppercase disabled:opacity-80'>Upload</button>
                    </div>
                    <button disabled={loading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>{loading ? 'Creating ....' : 'Create List'}</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing