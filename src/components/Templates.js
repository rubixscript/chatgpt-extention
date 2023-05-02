import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';

const Templates = ({  onPutQueryInTextArea }) => {

  const [templates, setTemplates] = useState([{ type: 'template1', text: 'template1' }, { type: 'template2', text: 'template1' }]);

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Templates</h2>
      <ul>
        {templates.map((query, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{query.type}</span>
            <button
              onClick={() => onPutQueryInTextArea(query.text)}
              className="bg-green-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faClipboard} />
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Templates;
