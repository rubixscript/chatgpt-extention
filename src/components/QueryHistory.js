import React from 'react';

const QueryHistory = ({ queryHistory }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Query History</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Queries</th>
          </tr>
        </thead>
        <tbody>
          {queryHistory.map((query, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {query.split(' ').slice(0, 15).join(' ')}
                {query.split(' ').length > 15 && '...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryHistory;
