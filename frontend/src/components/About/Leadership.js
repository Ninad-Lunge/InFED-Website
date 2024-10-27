const Leadership = () =>{
    return(
        <div className="leadership-section mx-12 my-8">
            <h1 className="text-3xl text-left my-10">Leadership at <span className="text-[#F7A221] font-bold">InFED</span></h1>
            <div className="partition flex flex-col md:grid md:grid-cols-3 gap-x-8 order-1">
                <div className="about-image flex flex-col gap-y-2 mb-5">
                    <img src={require('../../assests/images/aboutPage/Bhimaraya-Metri.png')} alt="img" className="border border-yellow-400 rounded-md p-2 md:mx-16 object-fit" />
                    <h1 className="font-bold text-lg">Dr. Bhimaraya Metri</h1>
                    <h1 className="text-gray-400 font-semibold text-base">Chairman InFED, IIM Nagpur</h1>
                </div>
                <div className="text md:col-span-2 order-2">
                    <p className="text-xl text-left">
                        The IIMN Foundation for Entrepreneurship Development (InFED) has been established to 
                        facilitate the development of a thriving ecosystem for aspiring entrepreneurs – 
                        meeting and redefining global benchmarks for incubation, knowledge creation and 
                        dissemination. The InFED is well-equipped to offer such support primarily because 
                        of our emphasis on collaboration with domain experts, bridging the theory-praxis gap, 
                        and maintaining vibrant engagement with the industry.
                    </p>
                    <p className="text-xl text-left mt-10">
                        Owing to its location in the logistical hub of the nation, in close proximity to a 
                        designated Special Economic Zone, the opportunities of growth for enterprises in 
                        association with InFED are endless. In a very short time, we have grown by leaps 
                        and bounds, forging valuable partnerships with national and international organizations, 
                        and incubating start-ups from a variety of domains. We aimed to be recognized as Asia’s 
                        largest incubation centre in the coming years, supporting the vision of IIM Nagpur and 
                        positioning ourselves as a leading institution for entrepreneurial education and research 
                        in the country as well as internationally.
                    </p>
                    <p className="text-xl text-left mt-10">
                        The disruption being observed all around us has underscored the importance of an 
                        entrepreneurial mindset in all aspects of our lives. Innovation is no more optional, 
                        but an essential element of everyday work in organizations. In this scenario, InFED is 
                        poised to widen its horizons and reach new milestones, and we welcome entities that share 
                        our vision and seek to grow with us, in our ever-evolving journey.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Leadership;