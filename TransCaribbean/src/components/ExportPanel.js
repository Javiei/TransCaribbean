import React from 'react';
import SharedButton from './SharedButton';

const ExportPanel = ({ onBack = () => {}, onStartExportForm = () => {} }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Opciones de Exportación</h2>
        <div className="space-y-4">
          <SharedButton
            onClick={onStartExportForm}
            className="bg-red-800 text-white hover:bg-red-900"
          >
            Registrar Exportación
          </SharedButton>
          <SharedButton
            onClick={() => alert('Exportando a Excel... (Funcionalidad no implementada)')}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
          >
            Exportar a Excel
          </SharedButton>
          <SharedButton
            onClick={() => alert('Exportando a Google Sheets... (Funcionalidad no implementada)')}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
          >
            Exportar a Google Sheets
          </SharedButton>
        </div>
        <SharedButton
          onClick={onBack}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 mt-6"
        >
          Volver
        </SharedButton>
      </div>
    </div>
  );
};

export default ExportPanel;