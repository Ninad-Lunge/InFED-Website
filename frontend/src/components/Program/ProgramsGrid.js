import ProgramCard from "./ProgramCard";
import { useEffect, useState } from 'react';

const ProgramGrid = () => {
    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        fetch('https://infed-website-kkva.onrender.com/api/get-schemes')
            .then((response) => {
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then((data) => setSchemes(data))
            .catch((error) => console.error('Error fetching schemes:', error));
    }, []);

    return(
        <div className="program-grid grid grid-cols-1 scale-75 md:scale-100 lg:grid-cols-3 md:grid-cols-2 gap-4 md:mx-12 justify-items-center">
            {schemes.map((scheme, index) => {
                return <ProgramCard key={index} scheme={scheme} />
            })}
        </div>
    );
};

export default ProgramGrid;