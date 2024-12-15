import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = forwardRef((props, ref) => {
    const navigate = useNavigate();

    const handlePrivacy = () => {
        navigate('/privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div ref={ref} id="contact" className="contact bg-black mt-20">
            <img
                src={require('../assests/images/InFED-mono.png')}
                alt="logo"
                className="logo w-52 pt-20 pb-5 ms-20"
            />

            <div className="links grid grid-cols-1 md:grid-cols-4 gap-x-10 py-8 mx-20 mb-5">
                <div className="address text-white text-left md:col-span-2">
                    <div className="flex flex-col">
                        <div className="address">
                            <h1 className="text-2xl pb-5 font-bold flex items-center">
                                Address
                            </h1>
                            <p className="text-[20px] my-2">InFED, Indian Institute of Management Nagpur,
                                Plot No. 1, Sector 20, MIHAN,Nagpur, Maharashtra 441108
                            </p>
                        </div>

                        <div className="follow text-white text-left flex gap-x-40 mt-10">
                            <div>
                                <h1 className="text-2xl pb-5 font-bold">Email</h1>
                                <span className="text-[20px] font-normal">infed@iimnagpur.ac.in</span>
                            </div>

                            <div>
                                <h1 className="text-2xl pb-5 font-bold">Follow Us</h1>
                                <div className="icons flex flex-row gap-x-5">
                                    <a href="https://www.linkedin.com/company/infed/" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="text-white" size={30} />
                                    </a>
                                    <a href="https://x.com/infed_iimn" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="text-white" size={30} />
                                    </a>
                                    <a href="https://www.facebook.com/infed.iimn" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook className="text-white" size={30} />
                                    </a>
                                    <a href="https://www.instagram.com/infed_iimnagpur/" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram className="text-white" size={30} />
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="w-auto ml-4 md:col-span-2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.8339018280512!2d79.032141!3d21.039331!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bf00064c1bad%3A0xee808034e128737d!2sIIMN%20Foundation%20for%20Entrepreneurship%20Development%20(InFED)!5e0!3m2!1sen!2sin!4v1734274038178!5m2!1sen!2sin"
                        width="98%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="address"
                    ></iframe>
                </div>
            </div>

            <hr className="bg-white my-2 mx-20" />

            <div className="copyright mt-5 pb-10 mx-20">
                <p className="text-white text-left font-semibold">
                    Copyright © InFED 2024 - 2025
                    <span className='mx-4 hover:cursor-pointer' onClick={handlePrivacy}>Privacy policy</span>
                    <span>Terms of use</span>
                </p>
            </div>
        </div>
    );
});

export default Contact;