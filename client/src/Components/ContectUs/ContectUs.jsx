import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ContectUs() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const userId = currentUser?.data?._id;
    const [formData, setFormData] = useState({
        name: currentUser?.data?.username || "",
        email: currentUser?.data?.email || "",
        subject: "",
        phone: "",
        message: "",
    });

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/contect/query/message', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, userId })
            });

            const result = await res.json();
            setLoading(false);
            if (!res.ok) {
                toast.error(result.message);
                return;
            }

            // toast.success("Submitted successfully");
                navigate('/contectus/Submit/Sucessful');            

        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    const handlechange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <div className="main">
            <div className="Contect-form">
                <h1 className='font-bold text-3xl m-2 text-center'>Contact Us</h1>
                <form onSubmit={SubmitHandler}>
                    <div className="form-inputs flex flex-col flex-wrap gap-3 max-w-64 sm:max-w-96 mx-auto mt-7 overflow-hidden">
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={handlechange} 
                            id='name' 
                            placeholder='Enter Your Name*' 
                            className='p-3 border rounded-md' 
                            required 
                        />
                        <input 
                            type="email" 
                            value={formData.email} 
                            onChange={handlechange} 
                            id='email' 
                            placeholder='Enter Your Email*' 
                            className='p-3 border rounded-md' 
                            required 
                        />
                        <input 
                            type="text" 
                            value={formData.subject} 
                            onChange={handlechange} 
                            id='subject' 
                            placeholder='Enter Your Subject*' 
                            className='p-3 border rounded-md' 
                            required 
                        />
                        <input 
                            type="number" 
                            value={formData.phone} 
                            onChange={handlechange} 
                            id='phone' 
                            min={10}
                            placeholder='Enter Your Number*' 
                            className='p-3 border rounded-md' 
                            required 
                        />
                        <textarea 
                            id='message' 
                            value={formData.message} 
                            onChange={handlechange} 
                            placeholder='Your Message *' 
                            className='p-3 ' 
                            required 
                        />
                        <button className='w-[40%] p-2 bg-slate-700 text-white rounded-lg hover:opacity-95'>
                            {loading ? 'Submitting ...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContectUs;
