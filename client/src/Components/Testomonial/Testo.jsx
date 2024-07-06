import React from 'react'
import ava01 from '../../assets/image/ava-1.jpg';
import ava02 from '../../assets/image/ava-2.jpg';
import ava03 from '../../assets/image/ava-3.jpg';


function Testo() {

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
                        <div className="testomonial py-4 px-3 border shadow-sm hover:shadow-lg">

                            <div className="flex items-center gap-4 mt-3">
                                <img src={ava01} className='w-h-16  h-16  rounded-2' alt="" />
                                <div className="">
                                    <h6 className="mb-0 mt-3">John Doe</h6>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit. Recusandae, quis.</p>
                                    <p className='font-bold'>Customer</p>
                                </div>
                            </div>
                        </div>

                        <div className="testomonial py-4 px-3 border shadow-sm hover:shadow-lg">

                            <div className="flex items-center gap-4 mt-3">
                                <img src={ava02} className='w-h-16  h-16  rounded-2' alt="" />
                                <div className="">
                                    <h6 className="mb-0 mt-3">Lia franklen</h6>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit. Recusandae, quis.</p>
                                    <p className='font-bold'>Customer</p>
                                </div>
                            </div>
                        </div>

                        <div className="testomonial py-4 px-3 border shadow-sm hover:shadow-lg">

                            <div className="flex items-center gap-4 mt-3">
                                <img src={ava03} className='w-h-16  h-16  rounded-2' alt="" />
                                <div className="">
                                    <h6 className="mb-0 mt-3">cath peterson</h6>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit. Recusandae, quis.</p>
                                    <p className='font-bold'>Customer</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Testo