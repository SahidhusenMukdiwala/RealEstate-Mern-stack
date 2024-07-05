import React from 'react'

function Search() {
    return (
        <div className="flex flex-col md:flex-row  ">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen ">
                <form className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-bold' htmlFor="seachTerm">Search Term</label>
                        <input type="search" id='seachTerm' placeholder='Search ...' className='border rounded-lg p-3 w-full' />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className='font-bold'>Type :</label>
                        <div className="flex  gap-2">
                            <input type="checkbox" className='w-5' id="all" />
                            <span className='font-bold'>Rent & Sale</span>
                        </div>
                        <div className="flex  gap-2">
                            <input type="checkbox" className='w-5' id="rent" />
                            <span className='font-bold'>Rent</span>
                        </div>
                        <div className="flex  gap-2">
                            <input type="checkbox" className='w-5' id="sale" />
                            <span className='font-bold'>Sale</span>
                        </div>
                        <div className="flex  gap-2">
                            <input type="checkbox" className='w-5' id="offers" />
                            <span className='font-bold'>offers</span>
                        </div>

                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex gap-2">
                            <label className='font-bold'>Amenities :</label>
                            <div className="flex  gap-2">
                                <input type="checkbox" className='w-5' id="parking" />
                                <span className='font-bold'>Parking</span>
                            </div>
                            <div className="flex  gap-2">
                                <input type="checkbox" className='w-5' id="furnished" />
                                <span className='font-bold'>Furnished</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className='font-bold'>Sort :</label>
                        <select id="sort_order" className='border rounded-lg p-3'>
                            <option value="">Price High to Low</option>
                            <option value="">Price Low to High</option>
                            <option value="">Latest</option>
                            <option value="">Oldest</option>
                        </select>
                    </div>
                    <button className='p-3 font-semibold bg-slate-700 text-white uppercase rounded-lg hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className="">
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
            </div>
        </div>
    )
}

export default Search