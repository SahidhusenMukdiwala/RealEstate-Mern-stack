import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaLandmark, FaParking, FaShare } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contect from '../Components/Contect/Contect'
function ListingPage() {
    SwiperCore.use([Navigation])
    const {currentUser} = useSelector((state) => state.user)
    const userId = currentUser?.data?._id;
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)
    const [contect, setContect] = useState(false)
    const params = useParams()
    console.log(params.id)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                console.log('ok')
                const res = await fetch(`/api/listing/get/${params.id}`)
                const data = await res.json()
                console.log("data in particular item", data)
                if (!res) {
                    setError(true)
                    toast.error(res.message)
                }
                toast.success(data.message)
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
                toast.error(error.message)
            }
        };
        fetchListing()
    }, []);

    return (
        <main>
            {loading && <p className='text-center my-7 text-2xl font-bold'>Loading .....</p>}
            {error && <p className='text-center my-7 text-2xl font-semibold '>Something going Wrong</p>}

            {
                listing && !loading && !error && (
                    <>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className="h-[550px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                            <FaShare className='text-slate-500' onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("Successfully Copied to clipboard")
                                setCopied(true)
                                setTimeout(() => {
                                    setCopied(false)
                                }, 2000);
                            }} />
                        </div>
                        <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                            <p className='text-2xl font-semibold'>
                                {listing.name.toUpperCase()} - ${' '}
                                {
                                    listing.offer
                                        ? listing.discountPrice.toLocaleString('en-Us')
                                        : listing.regularPrice.toLocaleString('en-Us')
                                }
                                {listing.type === 'rent' ? 'rent' && ' / month ' : 'sale' && ' / month '}
                            </p>

                            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'> <FaLandmark className='text-green-700 font-semibold text-lg'/>
                                {listing.address}
                            </p>
                            <div className="flex gap-4">
                                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                                    {listing.type === 'rent' ? 'For Rent' : "For Sale"}
                                </p>
                                {
                                    listing.offers && (
                                        <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>$ {+listing.regularPrice - +listing.discountPrice} OFF</p>
                                    )
                                }
                            </div>
                            <p className='text-slate-800'>
                                <span className='font-semibold text-black'>Description :- </span>
                                {listing.description}
                            </p>

                            <ul className='flex items-center gap-3 flex-wrap'>
                                <li className='flex items-center whitespace-nowrap gap-1 text-green-700'>
                                    <FaBed className='text-lg'/> 
                                    {listing.bedrooms} Bed
                                </li>
                                <li className='flex items-center whitespace-nowrap gap-1 text-green-700'>
                                    <FaBath className='text-lg'/> 
                                    {listing.bathrooms} Bath
                                </li>
                                <li className='flex items-center whitespace-nowrap gap-1 text-green-700'>
                                    <FaParking className='text-lg'/> 
                                    {listing.parking ? 'Parking Spot' : 'No Parking Spot'}
                                </li>
                                <li className='flex items-center whitespace-nowrap gap-1 text-green-700'>
                                    <FaChair className='text-lg'/> 
                                    {listing.furnished ? 'Furnished' : 'Un Furnished'}
                                </li>
                            </ul>
                                {
                                    currentUser && listing.userRef !== userId && !contect && (
                                        <button onClick={()=>setContect(true)} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Contect Landlord</button>
                                    )
                                }

                                {contect && <Contect listing={listing}/>}

                        </div>
                    </>
                )
            }
        </main>
    )
}

export default ListingPage