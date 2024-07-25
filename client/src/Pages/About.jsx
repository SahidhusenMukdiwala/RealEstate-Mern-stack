import React, { useEffect } from 'react';
import Aos from 'aos'
import 'aos/dist/aos.css'
const About = () => {
  useEffect (()=>{
    Aos.init({duration:3000})
  })
  return (
    <div className='p-5 flex justify-around gap-3 flex-wrap' >
      <div data-aos = "zoom-in-right"  className="border p-3 flex flex-col gap-3 flex-wrap shadow-md cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-gray-700 hover:text-white transition-all">
      <h1 className='font-bold text-3xl shadow-sm'>About Us</h1>
      <p>
        Welcome to [Your Real Estate  Company]<br />, your number one source for all<br /> things real estate. 
        We're <br /> dedicated to providing you the<br /> very best of real estate  services,<br /> with an emphasis on reliability, customer  <br /> service, and  uniqueness.
      </p>
      </div>
      <div data-aos = "zoom-in-right"  className="border p-3 flex flex-col gap-3 flex-wrap shadow-md cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-slate-700 hover:text-white transition-all">
      <h2  className='font-bold text-3xl shadow-sm'>Our Mission</h2>
      <p>
        Our mission is to help you find your <br /> dream home or the perfect property <br />investment. 
        We strive to make the<br />  process as smooth and efficient as possible.
      </p>
      </div>
      <div data-aos = "zoom-in-right"  className="border p-3 flex flex-col gap-3 flex-wrap shadow-md cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-slate-700 hover:text-white transition-all">
      <h2 className='font-bold text-3xl shadow-sm'>Our Team</h2>
      <p>
        Our team consists of experienced real  <br /> estate professionals who are passionate  <br /> about helping our clients navigate the <br /> complex real estate market. 
        From  <br />agents to customer service representatives,  <br />each member of our team is dedicated to  <br /> your success.
      </p>
      </div>
      <div data-aos = "zoom-in-right"  className="border p-3 flex flex-col gap-3 flex-wrap shadow-md cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-slate-700 hover:text-white transition-all">
      <h2 className='font-bold text-3xl shadow-sm'>Contact Us</h2>
      <p>
        If you have any questions or  <br /> comments, please don't hesitate <br /> to contact us. 
        Our customer service <br /> team is always ready to assist you.
      </p>
      </div>
    </div>
  );
};

export default About;
