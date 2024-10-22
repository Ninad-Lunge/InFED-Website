const Contact = () => {
    return(
        <div className="contact bg-black mt-20">
            <div className="links flex flex-row gap-x-48 p-8">
                <div className="collaboration text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold">Collaboration</h1>
                    <p className="text-[20px]">Industry Partners</p>
                    <p className="text-[20px]">Outreach Partners</p>
                </div>

                <div className="links text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold">Quick Links</h1>
                    <p className="text-[20px]">Important Links</p>
                    <p className="text-[20px]">Brand Guidelines</p>
                </div>

                <div className="follow text-white text-left">
                    <h1 className="text-3xl pb-10 font-bold">Follow Us</h1>
                </div>
            </div>

            <hr className="bg-white m-2"/>

            <div className="copyright mt-20 pb-10 ms-10">
                <p className="text-white text-left">Copyright © InFED 2024 - 2025 privacy policy terms of use</p>
            </div>

        </div>
    );
}

export default Contact;