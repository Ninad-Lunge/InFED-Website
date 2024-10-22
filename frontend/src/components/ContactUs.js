import { FaLinkedin, FaTwitter, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

const Contact = () => {
    return(
        <div className="contact bg-black mt-20">

            <img src={require('../assests/images/InFED-mono.png')} alt="logo" className="logo w-52 py-20 ms-20" />

            <div className="links grid grid-cols-2 md:grid-cols-3 gap-x-48 py-8 mx-20 mb-20">
                <div className="collaboration text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold">Collaboration</h1>
                    <p className="text-[20px] my-2">Industry Partners</p>
                    <p className="text-[20px] my-2">Outreach Partners</p>
                </div>

                <div className="links text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold">Quick Links</h1>
                    <p className="text-[20px] my-2">Important Links</p>
                    <p className="text-[20px] my-2">Brand Guidelines</p>
                </div>

                <div className="follow text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold" >Follow Us</h1>
                    <div className="icons flex flex-row gap-x-5">
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-white" size={30} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-white" size={30} />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-white" size={30} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-white" size={30} />
                        </a>
                        <a href="https://www.gmail.com" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope className="text-white" size={30} />
                        </a>
                    </div>
                </div>
            </div>

            <hr className="bg-white my-2 mx-20"/>

            <div className="copyright mt-20 pb-10 ms-20">
                <p className="text-white text-left">Copyright © InFED 2024 - 2025 privacy policy terms of use</p>
            </div>

        </div>
    );
}

export default Contact;