import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Contact from '../ContactUs';

const ProgramDetails = () => {
    const contactRef = useRef(null);
    
    const { id } = useParams();
    const [scheme, setScheme] = useState(null);

    useEffect(() => {
        fetch(`/api/get-scheme/${id}`)
            .then((res) => res.json())
            .then((data) => setScheme(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!scheme) return <div>Loading...</div>;

    return(
        <div className="program-details mt-5">
            <Navbar contactRef={contactRef} />
            
            <div className='scheme-details mt-10 flex flex-col items-center'>
                <h1 className='text-3xl font-bold'>{scheme.name}</h1>
                <img src={scheme.image} alt={scheme.name} className="image p-10 w-60" />
                <button className="apply-btn border border-black">
                    Apply Now
                </button>
            </div>

            <Contact ref={contactRef} />
        </div>
    );
};

export default ProgramDetails;