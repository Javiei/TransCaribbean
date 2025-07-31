import React from 'react';

const SharedInput = ({ type = 'text', placeholder = '', value = '', onChange = () => {}, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition duration-300 ease-in-out ${className}`}
    />
  );
};

export default SharedInput;