import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Home() {
  const [offerListing,setofferListing] = useState([])
  const [saleListing,setsaleListing] = useState([])
  const [rentListing,setrentListing] = useState([])
  useEffect(() => {
    const fetchOffer = async() =>{
      try {
        const res =await fetch(`/api/listing/get?offer=true&limit=4`)
        const result = await res.json()
        setofferListing(result)
        FetchRentListing()

      } catch (error) {
        console.log(error)
      }
    }

    const FetchRentListing =async() =>{
      try {
        const res =await fetch(`/api/listing/get?type=rent&limit=4`)
        const result = await res.json()
        setrentListing(result)
        FetchSaleListing()

      } catch (error) {
        console.log(error)
      }
    }
    const FetchSaleListing =async() =>{
      try {
        const res =await fetch(`/api/listing/get?type=sale&limit=4`)
        const result = await res.json()
        setsaleListing(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOffer()
  }, [])
  
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your next <span className='text-slate-500'>perfact</span> <br /> place with ease</h1>

        <div className="text-gray-400 text-xs sm:text-sm">
          <p>Real Estate is the best place to find your next perfact place to live . <br />
            We have a wide range of properties for you to choose from .
          </p>
        </div>
        <Link className='text-xs sm:text-sm font-bold hover:underline text-blue-700' to={'/search'}>
          <button>Lets get Start ....</button>
        </Link>
      </div>

      
    </div>
  )
}
