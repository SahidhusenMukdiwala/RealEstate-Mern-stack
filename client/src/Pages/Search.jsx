import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Search() {
    const navigate = useNavigate()
    const [loading ,setLoading] = useState (false)
    const [listing ,setListing] = useState ([])
    const [sideBarData,setSideBarData] =useState({
        searchTerm:"",
        type:'all',
        parking:false,
        furnished:false,
        offers:false,
        sort:'created_at',
        order:'desc'
    })

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')
        const offersFromUrl = urlParams.get('offers')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')
        

        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || offersFromUrl || sortFromUrl || orderFromUrl || furnishedFromUrl){
            setSideBarData({
                searchTerm:searchTermFromUrl || '',
                type:typeFromUrl || 'all',
                parking:parkingFromUrl === 'true' ? true : false,
                furnished:furnishedFromUrl === 'true' ? true : false,
                offers:offersFromUrl === 'true' ? true : false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl || 'desc',
            })
        }
        const fetchListing = async()=>{
            setLoading(true);

            try {
                const searchQuery = urlParams.toString();
             const res = await fetch(`/api/listing/get?${searchQuery}`)
             const result = await res.json();
             if(!res.ok){
                toast.error(res.message)
             }
             setListing(result)
             console.log(result)
             setLoading(false);
             toast.success("Data Found")
            } catch (error) {
                toast.error(error.message)
            }
        }
        fetchListing()
    }, [location.search])


    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarData({...sideBarData,type:e.target.id})
        }
        if(e.target.id === 'parking' || e.target.id ==='furnished' || e.target.id ==='offers'){
            setSideBarData({...sideBarData,[e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id === 'searchTerm'){
            setSideBarData({...sideBarData,searchTerm:e.target.value})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'
            setSideBarData({...sideBarData,sort:sort,order:order})
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sideBarData.searchTerm)
        urlParams.set('type', sideBarData.type)
        urlParams.set('furnished', sideBarData.furnished)
        urlParams.set('offers', sideBarData.offers)
        urlParams.set('order', sideBarData.order)
        urlParams.set('parking', sideBarData.parking)
        urlParams.set('sort', sideBarData.sort)

        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)

    }
    return (
        <div className="flex flex-col md:flex-row  ">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen ">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-bold' htmlFor="seachTerm">Search Term</label>
                        <input type="search" value={sideBarData.searchTerm} onChange={handleChange} id='searchTerm' placeholder='Search ...' className='border rounded-lg p-3 w-full' />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className='font-bold'>Type :</label>
                        <div className="flex  gap-2">
                            <input checked={sideBarData.type === 'all'} onChange={handleChange} type="checkbox" className='w-5' id="all" />
                            <span className='font-bold'>Rent & Sale</span>
                        </div>
                        <div className="flex  gap-2">
                            <input onChange={handleChange} checked={sideBarData.type==='rent'} type="checkbox" className='w-5' id="rent" />
                            <span className='font-bold'>Rent</span>
                        </div>
                        <div className="flex  gap-2">
                            <input onChange={handleChange} checked={sideBarData.type === 'sale'} type="checkbox" className='w-5' id="sale" />
                            <span className='font-bold'>Sale</span>
                        </div>
                        <div className="flex  gap-2">
                            <input onChange={handleChange} checked={sideBarData.offers} type="checkbox" className='w-5' id="offers" />
                            <span className='font-bold'>offers</span>
                        </div>

                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex gap-2">
                            <label className='font-bold'>Amenities :</label>
                            <div className="flex  gap-2">
                                <input onChange={handleChange} checked={sideBarData.parking} type="checkbox" className='w-5' id="parking" />
                                <span className='font-bold'>Parking</span>
                            </div>
                            <div className="flex  gap-2">
                                <input onChange={handleChange} checked={sideBarData.furnished} type="checkbox" className='w-5' id="furnished" />
                                <span className='font-bold'>Furnished</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className='font-bold'>Sort :</label>
                        <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-3'>
                            <option value="regularPrice_desc">Price High to Low</option>
                            <option value="regularPrice_asc">Price Low to High</option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button  className='p-3 font-semibold bg-slate-700 text-white uppercase rounded-lg hover:opacity-95'>Search</button>
                </form>
            </div>
            <div className="">
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
            </div>
        </div>
    )
}

export default Search