const AboutInFED = () =>{
    return(
        <div className="aboutInFED grid grid-cols-3 gap-4 mx-12">
            <div className="text col-span-2">
                <h1 className="text-3xl text-left my-10">About <span className="text-[#F7A221] font-bold">InFED</span></h1>
                <p className="text-xl text-left">
                    IIMN Foundation for Entrepreneurship Development is the business incubator of IIM Nagpur. 
                    InFED works with significant players at the local, state, federal, and international levels to 
                    build an ecosystem that supports entrepreneurs and related parties. It serves as a link between 
                    aspiring business owners, academics, research organisations, companies, investors, and the 
                    government.
                </p>
                <p className="text-xl text-left mt-10">
                    InFED is a Section 8 company under the Companies Act 2013. InFED is consistently building its 
                    capabilities to ensure state-of-art facilities for its incubates.
                </p>
            </div>
            <div className="about-image">
                <img src="" alt="img" className=" border border-yellow-400 rounded-md h-[320px] mt-10" />
            </div>
        </div>
    );
}

export default AboutInFED;