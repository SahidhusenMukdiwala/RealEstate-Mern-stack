import React, { useEffect, useRef, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function Review() {
  const { currentUser } = useSelector((state) => state.user)
  console.log(currentUser)
  const [tourRating, setTourRating] = useState(null)
  const [reviews, setReviews] = useState([]);
  console.log("reviews", reviews)
  const params = useParams()
  const reviewMsgRef = useRef('')
  console.log(tourRating)


  const FetchallReview = async () => {
    try {
      const res = await fetch('/api/review/allreviews')

      const result = await res.json()
      if (!res.ok) {
        toast.error(res.message)
      }
      setReviews(result)
      
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    FetchallReview();
  }, []);

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const comment = reviewMsgRef.current.value
    try {
      if (!currentUser || currentUser === undefined || currentUser === null) {
        alert("please Sign in")
      }
      const reviewObj = {
        comment,
        rating: tourRating
      }
      const res = await fetch(`/api/review/reviews/${params.id}`, {
        method: 'post',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({...reviewObj,
          user: currentUser?.data?._id
        }),
      })
      const result = await res.json()
      console.log( "user id in fetch func",currentUser?.data?._id)
      console.log(result)
      if (!result.ok) {
        return alert(result.message)
      }
      setReviews(result)
      FetchallReview()
      toast.success("review created successfully")

    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <>
    <div className="tour__reviews mt-4 border w-full p-5">
      <h4 className='text-center text-xl font-bold text-gray-500'>Reviews ({reviews.length === null? "Not reviewed" : reviews.length})</h4>

      <form onSubmit={SubmitHandler}>
        <div className="flex items-center gap-3 mb-4 rating__group">
        
          <span className='flex items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => setTourRating(1)}>1
          <i><FaStar className='hover:text-[#FFD700]'/></i>
          </span>

          <span className='flex items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => setTourRating(2)}>2
          <i><FaStar className='hover:text-[#FFD700]'/></i>
          </span>

          <span className='flex items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => setTourRating(3)}>3
          <i><FaStar className='hover:text-[#FFD700]'/></i>
          </span>

          <span className='flex items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => setTourRating(4)}>4
          <i><FaStar className='hover:text-[#FFD700]'/></i>
          </span>

          <span className='flex items-center gap-2' style={{ cursor: 'pointer' }} onClick={() => setTourRating(5)}>5
          <i><FaStar className='hover:text-[#FFD700]'/></i>
          </span>
        </div>

        <div className="review__input flex flex-col flex-wrap gap-3 shadow-lg">
          <input className='w-full p-3' type="text" ref={reviewMsgRef} placeholder='Share Your Thoughts' required />
          <button className='bg-gray-600 p-3 rounded-full  text-white' type='submit'>Submit</button>
        </div>
      </form>

      <div className='user__reviews'>
        {
           reviews?.map(review => (
          <div key={review._id} className="review__item flex flex-col gap-4 ">
            <img src='' alt="" />

            <div className="w-100 border p-3 shadow-lg overflow-hidden hover:bg-slate-700 hover:text-white hover:scale-105 transition">
              <div className="flex items-center justify-between ">
                <div className=''>
                  <p>{new Date(review.createdAt).toLocaleDateString('en-us', Option)}
                  </p>
                </div>
                <span className="">{review.rating}<i className="ri-star-s-fill"></i>
                </span>
              </div>
              <h6>{review.comment}</h6>
            </div>
          </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Review