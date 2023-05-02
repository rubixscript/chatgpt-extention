import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Scheduler = ({ scheduleJobs, onRemoveScheduleJob }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Scheduler</h2>
      <ul>
        {scheduleJobs.map((query, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{query.value}</span>
            <button
              onClick={() => onRemoveScheduleJob(index)}
              className="bg-red-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scheduler;
