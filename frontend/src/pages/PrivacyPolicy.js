import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Privacy = () => {
    const contactRef = useRef(null);

    return (
        <div className="event md:mt-10 bg-gray-50">
            <Navbar contactRef={contactRef} />
            <div className="text-left md:mx-20 px-4 pt-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">InFED′s Privacy Policy</h1>
                <p className="text-sm text-gray-600 mb-4">
                    <strong>Last Revised:</strong> October 7, 2022
                </p>
                <p className="mb-4">
                    At InFED, accessible from{' '}
                    <a href="https://infed.in" className="text-blue-600 underline">
                        infed.in
                    </a>
                    , one of our main priorities is the privacy of our visitors. This Privacy Policy
                    document contains types of information that is collected and recorded by InFED and
                    how we use it.
                </p>
                <p className="mb-6">
                    If you have additional questions or require more information about our Privacy Policy, do not
                    hesitate to{' '}
                    <a href="mailto:contact@infed.in" className="text-blue-600 underline">
                        contact us
                    </a>
                    .
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Consent</h2>
                    <p className="text-gray-700">
                        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
                    <p className="text-gray-700 mb-4">
                        The personal information that you are asked to provide, and the reasons why you are asked to
                        provide it, will be made clear to you at the point we ask you to provide your personal
                        information.
                    </p>
                    <p className="text-gray-700 mb-4">
                        If you contact us directly, we may receive additional information about you such as your name,
                        email address, phone number, the contents of the message and/or attachments you may send us, and
                        any other information you may choose to provide.
                    </p>
                    <p className="text-gray-700">
                        When you register for an Account, we may ask for your contact information, including items such
                        as name, company name, address, email address, and telephone number.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
                    <p className="text-gray-700 mb-4">We use the information we collect in various ways, including to:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Understand and analyze how you use our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>
                            Communicate with you, either directly or through one of our partners, including for customer
                            service, to provide you with updates and other information relating to the website, and for
                            marketing and promotional purposes
                        </li>
                        <li>Send you emails</li>
                        <li>Find and prevent fraud</li>
                    </ul>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Log Files</h2>
                    <p className="text-gray-700">
                        InFED follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and are a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cookies and Web Beacons</h2>
                    <p className="text-gray-700">
                        Like any other website, InFED uses ‘cookies’. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Google DoubleClick DART Cookie</h2>
                    <p className="text-gray-700">
                        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <a href="https://www.website.com" className="text-blue-600 underline">www.website.com</a> and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline">https://policies.google.com/technologies/ads</a>.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Advertising Partners</h2>
                    <p className="text-gray-700">
                        Some of the advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we have hyperlinked to their Privacy Policies below.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li><a href="https://policies.google.com/technologies/ads" className="text-blue-600 underline">Google</a></li>
                    </ul>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Advertising Partners Privacy Policies</h2>
                    <p className="text-gray-700">
                        You may consult this list to find the Privacy Policy for each of the advertising partners of InFED.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Third Party Privacy Policies</h2>
                    <p className="text-gray-700">
                        InFED’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                    </p>
                    <p className="text-gray-700">
                        You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
                    <p className="text-gray-700">
                        Under the CCPA, among other rights, California consumers have the right to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
                        <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
                        <li>Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.</li>
                    </ul>
                    <p className="text-gray-700">
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">GDPR Data Protection Rights</h2>
                    <p className="text-gray-700">
                        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                        <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                        <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                        <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                        <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                        <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                    </ul>
                    <p className="text-gray-700">
                        If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Children’s Information</h2>
                    <p className="text-gray-700">
                        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                    </p>
                    <p className="text-gray-700">
                        InFED does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                    </p>
                </section>
            </div>
            <Contact ref={contactRef} />
        </div>
    );
};

export default Privacy;