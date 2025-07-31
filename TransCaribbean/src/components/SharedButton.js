import React from 'react';

const SharedButton = ({ onClick = () => {}, children = 'Botón', className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 ${className}`}
    >
      {children}
    </button>
  );
};

export default SharedButton;