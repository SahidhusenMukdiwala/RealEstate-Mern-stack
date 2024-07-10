import React, { useRef, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
function Review() {
  const {currentUser} = useSelector((state) => state.user)
  console.log(currentUser)
  const [tourRating, setTourRating] = useState(null)

  const reviewMsgRef = useRef('')

  const SubmitHandler =async(e) =>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value

  }
  return (
    <div className="tour__reviews mt-4 border w-full p-5">
          <h4 className='text-center text-xl font-bold text-gray-500'>Reviews </h4>

          <form onSubmit={SubmitHandler}>
            <div className="flex items-center gap-3 mb-4 rating__group">
              <span style={{ cursor: 'pointer' }} onClick={() => setTourRating(1)}>1
              </span>
                <i><FaStar/></i>

              <span style={{ cursor: 'pointer' }} onClick={() => setTourRating(2)}>2
              </span>
                <i><FaStar/></i>

              <span style={{ cursor: 'pointer' }} onClick={() => setTourRating(3)}>3
              </span>
                <i><FaStar/></i>

              <span style={{ cursor: 'pointer' }} onClick={() => setTourRating(4)}>4
              </span>
                <i><FaStar/></i>

              <span style={{ cursor: 'pointer' }} onClick={() => setTourRating(5)}>5
              </span>
                <i><FaStar/></i>
            </div>

            <div className="review__input flex flex-col flex-wrap gap-3 shadow-lg">
              <input className='w-full p-3' type="text" ref={reviewMsgRef} placeholder='Share Your Thoughts' required />
              <button className='bg-gray-600 p-3 rounded-full  text-white' type='submit'>Submit</button>
            </div>
          </form>

          <div className='user__reviews'>
            {
            //  reviews?.map(review => (
              <div className="review__item">
                <img src='' alt="" />

                <div className="w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5>review.username</h5>
                      {/* <p>{new Date(review.createdAt).toLocaleDateString('en-us', option)} */}
                      {/* </p> */}
                    </div>
                    <span className="d-flex-align-items-center">review.rating<i className="ri-star-s-fill"></i>
                    </span>
                  </div>
                  {/* <h6>{review.reviewText}</h6> */}
                </div>
              </div>
            // ))
            }
          </div>
        </div>
  )
}

export default Review