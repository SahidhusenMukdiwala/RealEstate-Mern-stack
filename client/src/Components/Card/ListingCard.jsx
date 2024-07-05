import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

function ListingCard({ listings }) {

    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/listing/${listings._id}`}>
                <img className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' src={listings.imageUrls[0]} alt="properties img" />
                <div className="p-3 flex flex-col gap-2 w-full mt-5">
                    <p className='truncate font-semibold text-lg text-slate-700 uppercase' >{listings.name}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className='h-4 w-4 text-green-600' />
                        <p className='truncate font-semibold text-gray-600 text-sm' >{listings.address}</p>
                    </div>
                    <div className="">
                        <p className='text-sm text-gray-700 line-clamp-3'>{listings.description}</p>
                        <p className='text-slate-500 font-semibold mt-2'>$
                            {listings.offers ? listings.discountPrice.toLocaleString('en-Us') : listings.regularPrice.toLocaleString('en-Us')}
                            {listings.type === 'rent' && ' / Month'}
                            </p>
                    <div className="flex gap-2 mt-3">
                        <div className=" font-bold  text-green-600">
                            <p>{listings.bedrooms > 1 ? `${listings.bedrooms} Beds` : `${listings.bedrooms} Beds`}</p>
                            
                        </div>
                        <div className="font-bold  text-green-600">
                            <p>{listings.bathrooms > 1 ? `${listings.bathrooms} Baths` : `${listings.bathrooms} Baths`}</p>
                            
                        </div>
                    </div>
                    </div>



                </div>
            </Link>
        </div>
    )
}

export default ListingCard