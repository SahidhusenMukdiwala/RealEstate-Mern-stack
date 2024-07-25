import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import Aos from 'aos'
import 'aos/dist/aos.css'
function Testo() {
    useEffect (()=>{
        Aos.init({duration:3000})
      })
    const [reviews, setReviews] = useState([]);
    const { currentUser } = useSelector((state) => state.user)
    const FetchallReview = async () => {
        try {
            const res = await fetch('/api/review/my-allreviews')

            const result = await res.json()
            if (!res.ok) {
                toast.error(res.message)
            }
            setReviews(result)

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        FetchallReview();
    }, []);

    return (
        <>
            <div className="flex justify-center items-center mt-7 hover:cursor-pointer">
                <div className="">
                    <div className="text-center mb-5">
                        <h5 className='text-[#8993a4] text-lg font-semibold'>TESTIMONIALS</h5>
                        <h1 className='font-bold text-3xl'>What our customers are <br /> saying about Us</h1>
                        <p className='text-[#041533] font-semibold'>Hear from our satisfied buyers, tenants, owners and dealers</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-5 testomonial py-3 px-3 ">

                            {reviews?.map(review => (
                                <div data-aos="zoom-in-down" key={review._id} className="hover:scale-105  hover:bg-gray-600 hover:text-white shadow-lg hover:shadow-xl duration-[0.5s] mt-3">
                                    {/* <img src={userAva} clxassName='w-h-16  h-16  rounded-full' alt="" /> */}

                                    <div className="leading-[30px] border p-3" >
                                        <div className="flex gap-2 items-center justify-between text-lg">
                                            <h6 className="mb-0 font-bold">{review.username}</h6>
                                            <div className="flex items-center gap-3">
                                                <FaStar className='text-[#e4d685]' />
                                                <p className='float-right'> {review.rating}</p>
                                            </div>
                                        </div>
                                        <p className='uppercase font-mono'>{review.comment}</p>
                                        <p className='font-semibold'>Customer</p>
                                    </div>
                                </div>
                            )

                            )}

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Testo