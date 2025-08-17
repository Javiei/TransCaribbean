import React, { useState, useEffect } from 'react';
import SharedButton from './SharedButton';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import ApiService from '../utils/api';
import { processInvoiceData } from '../utils/helpers';

const MainPanel = ({ onSelectOption = () => {} }) => {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const facturasData = await ApiService.getFacturas();
        setFacturas(facturasData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error fetching facturas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { monthlySales, topClients, salesByRoute } = processInvoiceData(facturas, ApiService.getRutas());

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <SharedButton
              onClick={() => window.location.reload()}
              className="bg-red-800 text-white hover:bg-red-900"
            >
              Reintentar
            </SharedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Panel Principal</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartBar data={monthlySales} title="Ventas por Mes (USD)" />
          <ChartPie data={topClients} title="Top 5 Clientes por Ventas" />
          <ChartPie data={salesByRoute.map(item => ({ name: item.route, sales: item.sales }))} title="Ventas por Ruta" colors={['#8B0000', '#4B5563', '#6B7280']} />
        </div>

        <div className="space-y-4">
          <SharedButton
            onClick={() => onSelectOption('import')}
            className="bg-red-800 text-white hover:bg-red-900"
          >
            Importar
          </SharedButton>
          <SharedButton
            onClick={() => onSelectOption('export')}
            className="bg-red-800 text-white hover:bg-red-900"
          >
            Exportar
          </SharedButton>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;