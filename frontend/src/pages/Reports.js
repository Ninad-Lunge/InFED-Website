import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Navbar from '../components/Navbar';
import Contact from '../components/ContactUs';

const Reports = () => {
    const contactRef = useRef(null);
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('/api/reports/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleViewPdf = (report) => {
        if (!report.pdfPath) {
            setError('PDF file is missing.');
            return;
        }
        setSelectedReport(report);
        setIsModalOpen(true);
        setError(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    return (
        <div className="reports md:mt-10">
            <Navbar contactRef={contactRef} />
            <div className="flex flex-col items-center">
                <h1 className="text-2xl text-left my-10">
                    Our <span className="text-[#F7A221] font-bold">Reports</span>
                </h1>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {reports.map((report) => (
                    <div
                        key={report._id}
                        className="border rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={`http://localhost:5000${report.previewImagePath}`}
                            alt={`${report.name} Preview`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
                            <button
                                onClick={() => handleViewPdf(report)}
                                className="bg-[#F7A221] text-white px-4 py-2 rounded hover:bg-opacity-90"
                            >
                                View PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedReport && (
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    center
                    classNames={{
                        modal: 'custom-modal-class',
                    }}
                    styles={{
                        modal: {
                            maxWidth: '90vw',
                            width: '800px',
                            height: '90vh',
                            padding: '20px',
                        },
                    }}
                >
                    <div className="w-full h-full">
                        {error && <div className="text-red-500">{error}</div>}
                        {selectedReport.pdfPath && (
                            <div className="relative w-full h-[calc(90vh-40px)]">
                                <object
                                    data={`http://localhost:5000${selectedReport.pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                                    type="application/pdf"
                                    className="absolute top-0 left-0 w-full h-full"
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <div>
                                        Unable to display PDF. Please ensure you have a PDF viewer installed.
                                    </div>
                                </object>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            <Contact ref={contactRef} />
        </div>
    );
};

export default Reports;