import React, { useState } from 'react';

const SensorList = ({ sensors, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Ganti sesuai kebutuhan

  if (loading) {
    return <div className="text-center mt-10 text-gray-500 text-lg">Loading sensors...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Filter berdasarkan search term
  const filteredSensors = sensors.filter(sensor =>
    sensor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSensors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSensors.length / itemsPerPage);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Sensors</h2>
      
      <input
        type="text"
        placeholder="Search sensors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {Array.isArray(currentItems) && currentItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2">Sensor Name</th>
                <th className="px-4 py-2">Last Value</th>
                <th className="px-4 py-2">Units</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(sensor => (
                <tr key={sensor.itemid} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{sensor.name}</td>
                  <td className="px-4 py-2 border-b">{sensor.lastvalue || "N/A"}</td>
                  <td className="px-4 py-2 border-b">{sensor.units || "-"}</td>
                  <td className="px-4 py-2 border-b">{sensor.clock || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No sensors found for this host.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default SensorList;