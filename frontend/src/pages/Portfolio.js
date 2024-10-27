import Navbar from '../components/Navbar';
import StartupsGrid from '../components/Portfolio/StartupsGrid';

const Portfolio = () => {
    return(
        <div className="portfolio mt-10">
            <Navbar />
            <div className="flex flex-col items-center">
                <h1 className='text-2xl text-left my-10 '>Our Startup <span className="text-[#F7A221] font-bold"> Portfolio</span></h1>
            </div>
            <StartupsGrid />
        </div>
    );
}

export default Portfolio;