import React from 'react'

function ContectUs() {
    return (
        <div className="main">
            <div className="Contect-form">
                <h1 className='font-bold text-3xl m-2 text-center'>Contect Us</h1>
                <form>
                    <div className="form-inputs flex flex-col flex-wrap gap-3 max-w-64 sm:max-w-96 mx-auto mt-7 overflow-hidden">
                        <input type="text" id='name' placeholder='Enter Your Name' className='p-3 border rounded-md' required />
                        <input type="email" id='email' placeholder='Enter Your Email' className='p-3 border rounded-md' required />
                        <input type="text" id='subject' placeholder='Enter Your Subject' className='p-3 border rounded-md' required />
                        <input type="number" id='phone' placeholder='Enter Your Number' className='p-3 border rounded-md' required />
                        <textarea id='message' placeholder='Your Message' className='p-3 ' required />
                        <button className='w-[40%] p-2 bg-slate-700 text-white rounded-lg hover:opacity-95'>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ContectUs