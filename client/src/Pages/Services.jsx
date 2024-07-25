import React, { useEffect } from 'react'
import img1 from '../assets/image/1.png'
import img2 from '../assets/image/OIP.jpeg'
import img3 from '../assets/image/download.jpeg'
import Aos from 'aos'
import 'aos/dist/aos.css'
function Services() {
    useEffect (()=>{
        Aos.init({duration:2500})
      })
    return (
        <div className='Services mb-4'>
            <div className="main flex flex-col gap-7">
                <div className="text-center">
                    <h1 className='uppercase font-serif text-2xl sm:text-3xl border-b-4 w-60 mx-auto border-b-red-900 leading-[70px] sm:leading-[100px]'>Services</h1>
                </div>

                <div className="service-card  duration-[1s] cursor-pointer flex gap-3 justify-evenly flex-wrap">
                    <div data-aos ="fade-right" className="service-card-1 border p-10 shadow-lg border-b-2 border-b-red-900 rounded-lg hover:scale-105 hover:translate-y-[-10px] duration-[1s] hover:bg-red-900 hover:text-white">
                        <img src={img1} alt="cardImg" className=' mt-7 mx-auto w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full' />

                        <div className="text-center mt-7">
                            <h3 className='font-bold text-xl'>User Review</h3>
                            <p className='font-semibold'>Property reviews from users help you <br /> make informed decisions.</p>
                        </div>
                    </div>
                    <div data-aos ="fade-up" className="service-card-1 border p-3 shadow-lg border-b-2 border-b-red-900 rounded-lg hover:scale-105 hover:translate-y-[-10px] duration-[1s] hover:bg-red-900 hover:text-white">
                        <img src={img2} alt="cardImg" className='mt-7 mx-auto w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full ' />

                        <div className="text-center mt-7">
                            <h3 className='font-bold text-xl'>Agent Support</h3>
                            <p className='font-semibold'>Agents can easily add properties and <br /> manage authorization, ensuring a <br /> smooth process.</p>
                        </div>
                    </div>
                    <div data-aos ="fade-down" className="service-card-1 border p-3 shadow-lg border-b-2 border-b-red-900 rounded-lg hover:scale-105 hover:translate-y-[-10px] duration-[1s] hover:bg-red-900 hover:text-white">
                        <img src={img3} alt="cardImg" className='mt-7 mx-auto w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full' />

                        <div className="text-center mt-7">
                            <h3 className='font-bold text-xl'>Property Listings</h3>
                            <p className='font-semibold'>Discover a wide range of properties <br /> with detailed information and high- <br />quality images.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Services