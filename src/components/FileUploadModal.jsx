import React, { useRef, useState } from 'react';
import { CloudUpload } from 'lucide-react';

const FileUploadModal = ({ onClose, onFullClose, onFileSelect, error }) => {
  const fileInputRef = useRef(null);
  const [fileType, setFileType] = useState(null); // 'xlsx' or 'csv'

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    onFileSelect(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[460px] border text-center relative">
        <h2 className="text-xl font-semibold mb-6">Import Attendees - Attended</h2>

        {/* XLSX / CSV Buttons View */}
        {!fileType && (
          <>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setFileType('xlsx')}
                className="w-[160px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
              >
                Upload XLSX
              </button>
              <button
                onClick={() => setFileType('csv')}
                className="w-[160px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded"
              >
                Upload CSV
              </button>
            </div>

            {/* ✅ Show CLOSE text button here */}
            <button
              onClick={onFullClose ? onFullClose : onClose}
              className="mt-2 px-4 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              CLOSE
            </button>
          </>
        )}

        {/* Upload Box View */}
        {fileType && (
          <div className="mt-2">
            <div
              onClick={handleBoxClick}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition"
            >
              <CloudUpload className="mx-auto text-purple-500 mb-4" size={40} />
              <p className="text-gray-700">
                <span className="text-purple-600 font-medium underline">
                  Select an XLSX or CSV file
                </span>{' '}
                or drag and drop here.
              </p>
              <input
                type="file"
                ref={fileInputRef}
                accept={fileType === 'xlsx' ? '.xlsx,.xls' : '.csv'}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* 👇 CLOSE button below upload box */}
         {/* Cut icon to go back */}
<button
  onClick={() => setFileType(null)}
  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
  aria-label="Close upload box"
>
  ×
</button>
          </div>
        )}

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default FileUploadModal;
