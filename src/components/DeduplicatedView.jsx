import React, { useEffect, useState } from 'react';
import {
  Eye,
  Trash2,
  ChevronDown,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import api from '../services/api';

const DeduplicatedView = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/import/duplicates')
      .then(res => {
        const result = Array.isArray(res.data)
          ? res.data
          : res.data.unique || res.data.data || [];
        setData(result);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* ========== HEADER ========== */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-semibold text-gray-900">Attendees Table</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]">
                <option>Activity</option>
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]">
                <option>Assignment</option>
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Total Records:</span>
            <span className="text-sm font-semibold text-blue-600">{data.length}</span>
            <RefreshCw className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" />
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-purple-600">RB</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ========== FILTERS AREA ========== */}
      <div className="flex items-center justify-between px-8 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-600 mb-1.5">Activity</label>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]">
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-600 mb-1.5">Assignment</label>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[120px]">
                <option>All</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-5 py-2.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span className="text-sm font-medium">Presets</span>
          </button>
          <button className="flex items-center space-x-2 px-5 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            <span className="text-sm font-medium">Filters</span>
          </button>
        </div>
      </div>

      {/* ========== TABLE ========== */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                S.No
              </th>
              <th className="px-6 py-4 text-left w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                First Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                Last Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[140px]">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[100px]">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[120px]">
                Session Minutes
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[160px]">
                Join Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[160px]">
                Leave Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" 
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.firstName || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.lastName || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.email || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.phone || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.location || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.gender || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.source || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {row.sessionMinutes || <span className="text-red-500 italic">N/A</span>}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.joinTime ? (
                    <div className="flex flex-col">
                      <span>{new Date(row.joinTime).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">{new Date(row.joinTime).toLocaleTimeString()}</span>
                    </div>
                  ) : (
                    <span className="text-red-500 italic">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {row.leaveTime ? (
                    <div className="flex flex-col">
                      <span>{new Date(row.leaveTime).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-500">{new Date(row.leaveTime).toLocaleTimeString()}</span>
                    </div>
                  ) : (
                    <span className="text-red-500 italic">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No records message */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 mx-8 my-8 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg text-gray-600 font-medium">No records found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or import new data</p>
        </div>
      )}
    </div>
  );
};

export default DeduplicatedView;