import React from 'react';
import SharedButton from './SharedButton';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import { defaultInvoices } from '../mock/invoices';
import { defaultRoutes } from '../mock/routes';
import { processInvoiceData } from '../utils/helpers';

const MainPanel = ({ onSelectOption = () => {} }) => {
  const { monthlySales, topClients, salesByRoute } = processInvoiceData(defaultInvoices, defaultRoutes);

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