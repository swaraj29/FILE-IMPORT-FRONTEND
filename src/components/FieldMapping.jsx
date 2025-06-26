import React, { useState } from 'react';

const FieldMapping = ({ onComplete, exampleValues = {} }) => {
  const [mappings, setMappings] = useState({});

  const attendeeFields = [
    { name: "Email", required: true },
    { name: "First Name / Original Name", required: false },
    { name: "Last Name", required: false },
    { name: "Phone Number", required: false },
    { name: "Location", required: false },
    { name: "Source", required: false },
    { name: "Tags", required: false },
    { name: "Gender", required: false },
    { name: "Session Minutes", required: false },
    { name: "Join Time (Datetime)", required: false },
    { name: "Leave Time (Datetime)", required: false }
  ];

  const fileColumns = Object.keys(exampleValues || {});

  const handleMappingChange = (attendeeField, fileColumn) => {
    setMappings(prev => ({
      ...prev,
      [attendeeField]: fileColumn
    }));
  };

  const handleImport = () => {
    onComplete(mappings);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Import Attendees - Attended</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Table Headers */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Attendee Field
          </div>
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            File Column
          </div>
          <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Example Value
          </div>
        </div>

        {/* Field Mappings */}
        <div className="space-y-3">
          {attendeeFields.map((field, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-4 items-center py-3 border-b border-gray-100">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">
                  {field.name}
                </span>
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </div>

              {/* Dropdown */}
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={mappings[field.name] || ''}
                  onChange={(e) => handleMappingChange(field.name, e.target.value)}
                >
                  <option value="">Select</option>
                  {fileColumns.map((col, i) => (
                    <option key={i} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              {/* Example Value */}
              <div className="text-gray-500 text-sm">
                {mappings[field.name] ? exampleValues[mappings[field.name]] || '' : ''}
              </div>
            </div>
          ))}
        </div>

        {/* Import Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleImport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition-colors duration-200"
          >
            Import Attendees
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldMapping;
