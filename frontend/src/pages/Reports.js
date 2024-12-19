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
    const [hoveredId, setHoveredId] = useState(null);

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

            <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
                {reports.map((report) => (
                    <div
                        key={report._id}
                        className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        onMouseEnter={() => setHoveredId(report._id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="relative">
                            <img
                                src={`http://localhost:5000${report.previewImagePath}`}
                                alt={`${report.name} Preview`}
                                className="w-full h-96 object-cover"
                            />
                            <div className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${hoveredId === report._id ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">{report.name}</h3>
                            <div className="space-y-4">
                                {report.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2">
                                        {report.description}
                                    </p>
                                )}
                                <button
                                    onClick={() => handleViewPdf(report)}
                                    className="w-full py-3 px-6 bg-[#F7A221] text-white font-semibold rounded-lg 
                                             transition-all duration-300 flex items-center justify-center
                                             hover:bg-opacity-90 hover:shadow-md group"
                                >
                                    View Report
                                    <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </button>
                            </div>
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