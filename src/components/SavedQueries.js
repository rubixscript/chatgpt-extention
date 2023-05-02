import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTrashAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';

const SavedQueries = ({ savedQueries, onRemoveQuery, onSubmitQuery, onPutQueryInTextArea, onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // const handleCategoryInputChange = (event, index) => {
  //   onCategoryChange(index, event.target.value);
  // };

  const handleFilterChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredQueries = savedQueries.filter((query) =>
    selectedCategory === 'All' ? true : query.category === selectedCategory
  );

  const getDistinctCategories = () => {
    const categories = savedQueries.map((query) => query.category);
    return [...new Set(categories)];
  };

  const distinctCategories = getDistinctCategories();

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Saved Queries</h2>
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select
        name="categoryFilter"
        value={selectedCategory}
        onChange={handleFilterChange}
        className="border-2 border-gray-300 rounded ml-2"
      >
        <option value="All">All</option>
        {distinctCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <ul>
        {filteredQueries.map((query, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium"> {query.text.split(" ").slice(0,10).join(" ")}{query.text.split(" ").length > 10 ? "..." : ""}</span>
            {/* <input
              type="text"
              placeholder="Category"
              value={query.category}
              onChange={(event) => handleCategoryInputChange(event, index)}
              className="border-2 border-gray-300 rounded px-2 ml-2"
            /> */}
             <button
              onClick={() => onSubmitQuery(query.text)}
              className="bg-blue-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
            <button
              onClick={() => onPutQueryInTextArea(query.text)}
              className="bg-green-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faClipboard} />
            </button>
            <button
              onClick={() => onRemoveQuery(index)}
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

export default SavedQueries;
