import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ResidentPortal = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Resident Portal</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Welcome to your Barangay Portal</h2>
          <p className="text-gray-600">You are logged in as <span className="font-medium text-blue-600">{user?.email}</span></p>

          <div className="mt-8">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">Request a Document</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-4 border rounded hover:bg-blue-50 hover:border-blue-300 transition text-left">
                <span className="block font-bold">Barangay Clearance</span>
                <span className="text-sm text-gray-500">Request for employment or general purposes.</span>
              </button>
              <button className="p-4 border rounded hover:bg-blue-50 hover:border-blue-300 transition text-left">
                <span className="block font-bold">Certificate of Indigency</span>
                <span className="text-sm text-gray-500">Request for financial assistance or scholarships.</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentPortal;
