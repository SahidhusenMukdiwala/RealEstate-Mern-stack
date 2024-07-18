import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
function Successful() {
    return (
        <div>
            <div className="main max-w-72 sm:max-w-2xl shadow-xl mx-auto border p-3 mt-5">
                <div className="flex flex-col justify-center">
                    <div className="flex justify-center mb-3 text-6xl text-green-600">
                        <IoMdCheckmarkCircleOutline />
                    </div>
                    <div className="text text-center flex flex-col gap-3">
                        <h1 className=' font-serif text-xl'>🎉🎉Congratulations Details Submitted Successfully ......🎉🎉</h1>
                        <p className='font-semibold'>Your Submission is recieved and we will contect you soon.</p>

                        <h2>You should follow us on</h2>
                        <div className="social-links flex flex-wrap gap-3 text-2xl justify-center items-center">
                            <Link to={'https://www.instagram.com/'}><FaInstagramSquare className='bg-gray-700 text-white hover:scale-105 duration-[0.1s]'/></Link>
                            <Link to={'https://www.facebook.com/'}><FaFacebookSquare className='bg-gray-700 text-white hover:scale-105 duration-[0.1s]'/></Link>
                            <Link to={'https://www.youtube.com/'}><FaYoutubeSquare className='bg-gray-700 text-white hover:scale-105 duration-[0.1s]'/></Link>
                            <Link to={'https://www.linkedin.com/feed/'}><IoLogoLinkedin className='bg-gray-700 text-white hover:scale-105 duration-[0.1s]'/></Link>
                        </div>
                        <Link to={'/'} className='bg-gray-700 w-full sm:max-w-[40%]  p-3 text-white rounded-lg'>Back to Home</Link>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Successful