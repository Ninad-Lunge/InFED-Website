import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminReports = () => {
  const [name, setName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Fixed API endpoint to match the route in report.js
      const response = await axios.get('/api/reports/reports');
      if (response.data) {
        setReports(response.data);
      }
    } catch (error) {
      console.error('Fetch error details:', error.response || error);
      toast.error(error.response?.data?.message || 'Error fetching reports');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePreviewFileChange = (e) => {
    setPreviewFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name) {
      toast.error('Please provide a report name');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', name);
    if (pdfFile) formData.append('pdf', pdfFile);
    if (previewFile) formData.append('preview', previewFile);
  
    try {
      if (editingReport) {
        // Simplified update URL
        const response = await axios.put(
          `/api/reports/${editingReport._id}`, 
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        
        if (response.data && response.data.report) {
          toast.success('Report updated successfully');
          resetForm();
          fetchReports();
        }
      } else {
        const response = await axios.post('/api/reports/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.data && response.data.report) {
          toast.success('Report uploaded successfully');
          resetForm();
          fetchReports();
        }
      }
    } catch (error) {
      console.error('Submit error details:', error.response || error);
      
      if (error.response) {
        toast.error(error.response.data?.message || 'Error updating report');
      } else if (error.request) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Error updating report. Please try again.');
      }
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setName(report.name);
    setPdfFile(null);
    setPreviewFile(null);
  };

  const handleDelete = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await axios.delete(`/api/reports/${reportId}`);
        toast.success('Report deleted successfully');
        fetchReports();
      } catch (error) {
        console.error('Delete error details:', error.response || error);
        toast.error(error.response?.data?.message || 'Error deleting report');
      }
    }
  };

  const resetForm = () => {
    setName('');
    setPdfFile(null);
    setPreviewFile(null);
    setEditingReport(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">{editingReport ? 'Edit Report' : 'Upload Report'}</h2>
      <form onSubmit={handleSubmit} className="max-w-md mb-8">
        <div className="mb-4">
          <label className="block mb-2">Report Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            PDF File {editingReport && '(Leave empty to keep existing)'}
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfFileChange}
            className="w-full px-3 py-2 border rounded"
            required={!editingReport}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Preview Image {editingReport && '(Leave empty to keep existing)'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePreviewFileChange}
            className="w-full px-3 py-2 border rounded"
            required={!editingReport}
          />
        </div>
        <div className="flex gap-2">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingReport ? 'Update Report' : 'Upload Report'}
          </button>
          {editingReport && (
            <button 
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl mb-4">Reports List</h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : reports.length === 0 ? (
        <div className="text-center text-gray-500">No reports found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div key={report._id} className="border rounded p-4">
              <img 
                src={report.previewImagePath} 
                alt={report.name}
                className="w-full h-40 object-cover mb-2"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png'; // Add a placeholder image
                  e.target.onerror = null; // Prevent infinite loop
                }}
              />
              <h3 className="font-bold mb-2">{report.name}</h3>
              <div className="flex gap-2">
                <a 
                  href={`/api/reports/pdf/${report.pdfPath.split('/').pop()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View
                </a>
                <button
                  onClick={() => handleEdit(report)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReports;