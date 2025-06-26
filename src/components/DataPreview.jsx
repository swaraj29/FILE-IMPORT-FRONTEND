import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { toast, Toaster } from 'react-hot-toast';
import FileUploadModal from './FileUploadModal';

const DataPreview = ({ onNext, onFileSelect, fileUploadError }) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(1);
  const [headerRow, setHeaderRow] = useState(1);
  const [page, setPage] = useState(0);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const rowsPerPage = 20;

  const toastShown = useRef(false);

  useEffect(() => {
    if (showFileUpload) return;
    api.get('/import/data')
      .then(res => {
        const result = Array.isArray(res.data) ? res.data : res.data.data || [];
        setData(result);
        if (!toastShown.current) {
          toast.success('File parsed. Please select or confirm the header row.', {
            duration: 4000,
            position: 'top-center',
          });
          toastShown.current = true;
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to load data');
      });
  }, [showFileUpload]);

  if (showFileUpload) {
    return (
      <FileUploadModal
        onClose={() => setShowFileUpload(false)}
        onFileSelect={onFileSelect}
        error={fileUploadError}
      />
    );
  }

  const columns = data[0] ? Object.keys(data[0]) : [];
  const paginatedRows = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleNext = () => {
    const selectedRowData = data[selectedRow - 1];
    onNext(selectedRowData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <Toaster />
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-[1200px] max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Import Attendees - Attended</h2>
          <button
            onClick={() => setShowFileUpload(true)}
            className="text-gray-500 hover:text-gray-700 text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Table Preview */}
        <div className="p-6 flex-1 overflow-auto">
          <p className="text-sm text-gray-600 mb-2">
            File Preview (First 20 rows, {columns.length} columns):
          </p>
          <div className="border border-gray-300 rounded overflow-auto bg-white">
            {/* Table Headers */}
            <div className="flex bg-gray-100 text-sm font-semibold text-gray-800 border-b border-gray-300 min-w-max">
              <div className="w-40 px-4 py-2 border-r border-gray-300">SELECT (ROW #)</div>
              {columns.map((_, idx) => (
                <div key={idx} className="w-48 px-4 py-2 border-r border-gray-300">COL {idx + 1}</div>
              ))}
            </div>
            {/* Column Names */}
            <div className="flex bg-gray-50 text-sm font-semibold text-gray-900 border-b border-gray-300 min-w-max">
              <div className="w-40 px-4 py-2 border-r border-gray-300"></div>
              {columns.map((col, idx) => (
                <div key={idx} className="w-48 px-4 py-2 border-r border-gray-300 truncate">{col}</div>
              ))}
            </div>
            {/* Rows */}
            <div className="max-h-80 overflow-y-auto min-w-max">
              {paginatedRows.map((row, rowIdx) => {
                const rowNumber = page * rowsPerPage + rowIdx + 1;
                return (
                  <div
                    key={rowIdx}
                    className={`flex items-center border-b border-gray-200 ${
                      selectedRow === rowNumber ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="w-40 px-4 py-2 border-r border-gray-200 flex items-center">
                      <input
                        type="radio"
                        name="headerRow"
                        value={rowNumber}
                        checked={selectedRow === rowNumber}
                        onChange={() => {
                          setSelectedRow(rowNumber);
                          setHeaderRow(rowNumber);
                        }}
                        className="mr-3"
                      />
                      <span>{rowNumber}</span>
                    </div>
                    {Object.values(row).map((val, idx) => (
                      <div
                        key={idx}
                        className="w-48 px-4 py-2 text-sm text-gray-800 border-r border-gray-200 truncate"
                        title={String(val)}
                      >
                        {String(val)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Header Row Selector */}
          <div className="flex items-center mt-4">
            <label className="text-sm text-gray-600 mr-3 font-medium">Specify Header Row:</label>
            <input
              type="number"
              value={headerRow}
              onChange={(e) => setHeaderRow(Number(e.target.value))}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
              min={1}
              max={data.length}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded text-base transition"
          >
            Next: Map Fields
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPreview;
