import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminReports = () => {
  const [name, setName] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handlePreviewFileChange = (e) => {
    setPreviewFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !pdfFile || !previewFile) {
      toast.error('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('pdf', pdfFile);
    formData.append('preview', previewFile);

    try {
      const response = await axios.post('/api/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Report uploaded successfully');
      
      // Reset form
      setName('');
      setPdfFile(null);
      setPreviewFile(null);
      e.target.reset();
    } catch (error) {
      toast.error('Error uploading report');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl mb-4">Upload Report</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
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
          <label className="block mb-2">PDF File</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfFileChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Preview Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePreviewFileChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Report
        </button>
      </form>
    </div>
  );
};

export default AdminReports;