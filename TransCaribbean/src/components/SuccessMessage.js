import React from 'react';
import SharedButton from './SharedButton';

const SuccessMessage = ({ message = 'Operación exitosa!', onDone = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md text-center">
        <svg
          className="mx-auto h-16 w-16 text-red-800 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{message}</h2>
        <p className="text-gray-600 mb-6">Los datos han sido guardados correctamente.</p>
        <SharedButton
          onClick={onDone}
          className="bg-red-800 text-white hover:bg-red-900"
        >
          Listo
        </SharedButton>
      </div>
    </div>
  );
};

export default SuccessMessage;