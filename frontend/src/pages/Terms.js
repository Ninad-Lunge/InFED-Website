import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';
import { useRef } from 'react';

const Terms = () => {
    const contactRef = useRef(null);

    return (
        <div className="md:mt-10">
            <Navbar contactRef={contactRef} />
            <div className="text-left md:mx-20 px-4 pt-8">
                <h1 className="text-3xl font-bold mb-4">InFED′s Website Terms of Use</h1>
                <p className="text-lg mb-4">
                    <strong>Last Revised:</strong> December 15, 2024
                    <br />
                    <strong>Version:</strong> 1.1
                </p>

                <p className="mb-4">
                    The InFED website located at{' '}
                    <a href="https://infed.in" className="text-blue-600 underline">
                        infed.in
                    </a>{' '}
                    is a copyrighted work belonging to IIMN Foundation for Entrepreneurship Development (InFED, IIMN).
                </p>

                <p className="mb-4">
                    By logging into the Site, you are being compliant with these Terms and represent that you have the authority and capacity to enter into these Terms. <strong>YOU SHOULD BE AT LEAST 18 YEARS OF AGE TO ACCESS THE SITE.</strong>
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">Access to the Site</h2>
                    <p className=" mb-4">
                        Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited license to access the Site solely for your own personal, noncommercial use.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Certain Restrictions</h2>
                    <p className=" mb-4">
                        The rights approved to you in these Terms are subject to the following restrictions:
                    </p>
                    <ul className="list-disc pl-6  space-y-2">
                        <li>You shall not sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site</li>
                        <li>You shall not change, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Site</li>
                        <li>You shall not access the Site in order to build a similar or competitive website</li>
                        <li>Except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means</li>
                    </ul>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Intellectual Property Rights</h2>
                    <p className="">
                        All intellectual property rights, including copyrights, patents, trademarks, and trade secrets in the Site and its content are owned by Company or Company′s suppliers. These Terms do not give you any rights, title, or interest in these intellectual property rights.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">User Content</h2>
                    <p className=" mb-4">
                        You are exclusively responsible for any User Content you submit to the Site. By submitting User Content, you grant Company an irreversible, nonexclusive, royalty-free license to use, reproduce, and distribute your content.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Acceptable Use Policy</h2>
                    <p className=" mb-4">
                        You agree not to use the Site to:
                    </p>
                    <ul className="list-disc pl-6  space-y-2">
                        <li>Violate any third-party rights or intellectual property</li>
                        <li>Post unlawful, harassing, abusive, or threatening content</li>
                        <li>Share content harmful to minors</li>
                        <li>Violate any law or regulation</li>
                    </ul>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Disclaimers</h2>
                    <p className="">
                        The site is provided on an "as-is" and "as available" basis. Company and its suppliers disclaim all warranties and conditions, whether express, implied, or statutory.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Limitation of Liability</h2>
                    <p className="">
                        To the maximum extent permitted by law, Company′s liability is limited to a maximum of fifty U.S. dollars (US $50) for any damages arising from or related to these Terms.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Dispute Resolution</h2>
                    <p className="">
                        Any claims and disputes that cannot be resolved informally shall be resolved through binding arbitration on an individual basis under the terms of the Arbitration Agreement.
                    </p>
                </section>

                <section className="mb-8 border-b border-gray-300 pb-8">
                    <h2 className="text-2xl font-semibold  mb-3">Contact Information</h2>
                    <p className="">
                        <strong>Address:</strong> InFED, Indian Institute of Management Nagpur, Plot No. 1, Sector 20, MIHAN, Nagpur – 441108
                    </p>
                    <p className="">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:infed@iimnagpur.ac.in" className="text-blue-600 underline">
                            infed@iimnagpur.ac.in
                        </a>
                    </p>
                </section>
            </div>
            <Contact ref={contactRef} />
        </div>
    );
};

export default Terms;