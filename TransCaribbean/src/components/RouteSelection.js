import React, { useState } from 'react';
import SharedButton from './SharedButton';
import SharedInput from './SharedInput';
import ApiService from '../utils/api';

const RouteSelection = ({ onSelectRoute = () => {}, onBack = () => {}, operationType = 'import' }) => {
  const [routes, setRoutes] = useState(ApiService.getRutas());
  const [newRoute, setNewRoute] = useState('');

  const handleAddRoute = () => {
    if (newRoute.trim() !== '') {
      setRoutes([...routes, newRoute.trim()]);
      setNewRoute('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Selecciona una Ruta para {operationType === 'import' ? 'Importación' : 'Exportación'}</h2>
        <div className="space-y-4 mb-6">
          {routes.map((route, index) => (
            <SharedButton
              key={index}
              onClick={() => onSelectRoute(route)}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
            >
              {route}
            </SharedButton>
          ))}
        </div>
        <div className="flex space-x-2 mb-6">
          <SharedInput
            placeholder="Nueva ruta"
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
            className="flex-grow"
          />
          <SharedButton
            onClick={handleAddRoute}
            className="bg-red-800 text-white hover:bg-red-900 w-auto px-6"
          >
            Agregar
          </SharedButton>
        </div>
        <SharedButton
          onClick={onBack}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Volver
        </SharedButton>
      </div>
    </div>
  );
};

export default RouteSelection;