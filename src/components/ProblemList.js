import React from 'react';

const ProblemList = ({ problems, loading, formatTime, formatSeverity }) => {
  if (loading) {
    return <div className="text-center mt-10 text-gray-500 text-lg">Loading problems...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Problems</h2>
      {Array.isArray(problems) && problems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Severity</th>
                <th className="px-4 py-2">Problem</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.eventid} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{formatTime(problem.clock)}</td>
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded ${
                        problem.severity === "4"
                          ? "bg-red-500 text-white"
                          : problem.severity === "3"
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {formatSeverity(problem.severity)}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">{problem.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No problems found for this host.</p>
      )}
    </section>
  );
};

export default ProblemList;