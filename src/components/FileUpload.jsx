// src/components/FileUpload.jsx
import React, { useState } from 'react';
import api from '../services/api';
import FileUploadModal from './FileUploadModal';

const FileUpload = ({ onUploadComplete }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // Handles file selection and upload for this step only
  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files[0];
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
    ];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setError('Invalid file type. Only .xlsx, .xls, or .csv allowed.');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await api.post('/import/upload', formData);
      setShowModal(false);
      setError('');
      onUploadComplete();
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
  };

  // Add a callback to notify parent to fully close the import flow
  const handleFullClose = () => {
    setShowModal(false);
    if (typeof onUploadComplete === 'function') {
      onUploadComplete('close'); // pass a special value to indicate full close
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <button
        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center gap-2"
        onClick={() => setShowModal(true)}
      >
        📎 Import
      </button>

      {showModal && (
        <FileUploadModal
          onClose={() => setShowModal(false)}
          onFullClose={handleFullClose}
          onFileSelect={handleFileSelect}
          error={error}
        />
      )}
    </div>
  );
};

export default FileUpload;
