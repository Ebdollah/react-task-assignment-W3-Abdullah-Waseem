import React, { useState } from 'react';

function Filter({ onSet }) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    onSet(e.target.value);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-teal-800 p-4 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search characters..."
          className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all duration-200 shadow-sm"
        />
      </div>
    </div>
  );
}

export default Filter;
