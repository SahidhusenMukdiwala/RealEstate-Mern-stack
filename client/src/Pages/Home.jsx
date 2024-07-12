import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css/bundle'
import ListingCard from '../Components/Card/ListingCard.jsx'
import { FaBuildingShield,FaHouseCircleCheck, FaUser } from "react-icons/fa6";
import Testo from '../Components/Testomonial/Testo.jsx'
export default function Home() {
  const [offerListing, setofferListing] = useState([])
  const [saleListing, setsaleListing] = useState([])
  const [rentListing, setrentListing] = useState([])
  SwiperCore.use([Navigation])
  console.log(offerListing)
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const result = await res.json()
        setofferListing(result)
        FetchRentListing()

      } catch (error) {
        console.log(error)
      }
    }

    const FetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const result = await res.json()
        setrentListing(result)
        FetchSaleListing()

      } catch (error) {
        console.log(error)
      }
    }
    const FetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
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
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
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

      <Swiper navigation>
        {
          offerListing && offerListing.length > 0 && offerListing.map((listing) => (
            <SwiperSlide>
              <div className="h-[500px]" key={listing._id} style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: `cover` }}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListing && offerListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offers=true'}>Show More Offer</Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {offerListing.map((listing) => (
                <ListingCard key={listing._id} listings={listing} />
              ))
              }
            </div>
          </div>
        )
        }
        {saleListing && saleListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show More Offer</Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {saleListing.map((listing) => (
                <ListingCard key={listing._id} listings={listing} />
              ))
              }
            </div>
          </div>
        )
        }
        {rentListing && rentListing.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show More Offer</Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {rentListing.map((listing) => (
                <ListingCard key={listing._id} listings={listing} />
              ))
              }
            </div>
          </div>
        )
        }
      </div>


      <div className="Benefits__benefitSteps">
        <div className="">
          <h5 className='text-xl font-semibold text-[#8993a4] uppercase text-center'>Benifit of Us</h5>

          <div className="">
            <h1 className='text-[33px] font-bold text-center'>Why Choose Us</h1>
          </div>

          <div className="">
            <div className="flex flex-wrap items-center gap-3 justify-evenly m-3">
              <div className="border shadow-md hover:cursor-pointer hover:shadow-lg p-7">
                <FaBuildingShield className='text-[30px] text-blue-700 ' />
                <div className="flex text-[20px] items-center gap-2 font-semibold">
                  <span className='text-blue-700 font-semibold'>01.</span>
                  <h2> Over 12 Lac properties</h2>
                </div>
                <p className='text-lg text-[#8993a4]'>10,000+ properties are added every day</p>
              </div>
              <div className="border shadow-md hover:cursor-pointer hover:shadow-lg p-7">
                <FaHouseCircleCheck className='text-[30px] text-blue-700 ' />
                <div className="flex text-[20px] items-center gap-2 font-semibold">
                  <span className='text-blue-700 font-semibold'>02.</span>
                  <h2>Verify By Over Team</h2>
                </div>
                <p className='text-lg text-[#8993a4]'>Photos / Videos and other details are verified on location</p>
              </div>
              <div className="border shadow-md hover:cursor-pointer hover:shadow-lg p-7">
                <FaUser className='text-[30px] text-blue-700 ' />
                <div className="flex text-[20px] items-center gap-2 font-semibold">
                  <span className='text-blue-700 font-semibold'>03.</span>
                  <h2>Large User Base</h2>
                </div>
                <p className='text-lg text-[#8993a4]'>High active user count and user <br /> engagement to find and close deals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testo/>
      
    </div>
  )
}
