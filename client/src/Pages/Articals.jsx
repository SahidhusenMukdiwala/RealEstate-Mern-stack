import React from 'react'
import { Link } from 'react-router-dom'

function Articals() {
    return (
        <section className='Articals'>
            <div className="main flex flex-col gap-7">
                <div className="text-center">
                    <h1 className='uppercase font-serif text-2xl sm:text-3xl border-b-4 w-60 mx-auto border-b-red-900 leading-[70px] sm:leading-[100px]'>Articles</h1>
                </div>

                <div className="card">
                    <div className="cards flex flex-col gap-4">
                        <div className="Articals-card flex justify-around flex-wrap gap-5">
                            <div className="subcard-1 m-3 sm:m-0 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] text-center hover:shadow-lg sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/8078/400_5cda75619d802.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>10 Steps To Starting a Business</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://www.coursera.org/articles/start-a-business#:~:text=1%201.%20Choose%20your%20business%20idea.%20Whether%20you,8.%20Open%20a%20bank%20account.%20...%20More%20items?msockid=0ead10fcaa736fe1106202bbabe86ef6'}>Read More ...</Link>
                                </div>
                            </div>
                            <div className="subcard-2 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] text-center hover:shadow-lg sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/5905/400_5cda5f12cb384.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>7 Big Things A Start-Up Must Have To <br /> Succeed</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://www.forbes.com/sites/thesba/2014/01/21/7-big-things-a-start-up-must-have-to-succeed/'}>Read More ...</Link>
                                </div>
                            </div>
                        </div>

                        <div className="Articals-card flex justify-around flex-wrap gap-5">
                            <div className="subcard-1 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] text-center hover:shadow-lg sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/1808586/400_5dd0de7f2ef61.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>How To Make Extra Money</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://www.forbes.com/advisor/business/best-side-hustle-ideas/'}>Read More ...</Link>
                                </div>
                            </div>
                            <div className="subcard-2 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] text-center hover:shadow-lg sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/3879273/400_5e41a5a816a8f.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>Boost Your Income</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://www.upwork.com/resources/best-ways-to-increase-income'}>Read More ...</Link>
                                </div>
                            </div>
                        </div>

                        <div className="Articals-card flex justify-around flex-wrap gap-5">
                            <div className="subcard-1 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] hover:shadow-lg text-center sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/11785/400_5cdaa3a08c6ff.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>How To Motivate <br />Employees</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://hbr.org/2023/05/how-to-motivate-employees-when-their-priorities-have-changed'}>Read More ...</Link>
                                </div>
                            </div>
                            <div className="subcard-2 subcard flex flex-wrap gap-4 border shadow-md p-5 hover:scale-105 duration-[1s] hover:shadow-lg text-center sm:text-start">
                                <div className="img">
                                    <img src={'https://static1.s123-cdn-static-a.com/ready_uploads/media/3896446/400_5e43f4f42a01e.jpg'} className='w-[300px] h-auto' alt="" />
                                </div>
                                <div className="content flex flex-col gap-4">
                                    <h2 className='font-semibold text-xl'>How To Pick a Name For <br /> Your Startupe</h2>

                                    <p className='font-semibold'>This is a generic article you can use for adding <br /> article content / subjects on your website.</p>
                                    <Link className='font-bold hover:underline' to={'https://hbr.org/2022/03/how-to-pick-the-best-name-for-your-company'}>Read More ...</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Articals