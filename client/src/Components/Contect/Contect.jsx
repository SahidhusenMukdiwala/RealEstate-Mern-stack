import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Contect({ listing }) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    console.log(listing.userRef)
    console.log('landlord',landlord)
    console.log(`/api/agent/agents/${listing.userRef}`)
    useEffect(() => {
        const FetchLandLord = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/agent/agents/${listing.userRef}`)
                console.log(res)
                const result = await res.json()
                console.log("result", result)
                if (!res.ok) {
                    setError(false)
                    toast.error(res.message)
                }
                console.log(result)
                setLandlord(result)
                setLoading(false)
                setError(false)
            } catch (error) {
                toast.error(error.message)
                setError(false)
                setLoading(false)
            }
        }
        FetchLandLord()
    }, [listing.userRef])

    const handleChange = async (e) => {

        setMessage(e.target.value)
    }

    return (
        <>
            {
                landlord && (
                    <div className=" flex flex-col gap-2">
                        <p>Contect <span className='font-semibold'>{landlord.username}</span> For <span className='lowercase font-semibold'> {listing.name}</span></p>
                        <textarea className='w-full border border-black p-3 rounded-lg focus:outline-none' placeholder='Enter Your Message' name="message" id="message" rows='2' value={message} onChange={handleChange}></textarea>
                        {/*================ Below Code for the mail ================== */}
                        <Link className='bg-slate-700 text-white p-3 text-center font-bold uppercase rounded-lg hover:opacity-95' to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
                    </div>
                )
            }
        </>
    )
}

export default Contect