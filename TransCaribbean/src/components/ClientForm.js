import React, { useState } from 'react';
import SharedButton from './SharedButton';
import SharedInput from './SharedInput';
import { defaultClients } from '../mock/clients';

const ClientForm = ({ onClientSubmit = () => {}, onBack = () => {}, operationType = 'import' }) => {
  const [isNewClient, setIsNewClient] = useState(true);
  const [selectedClient, setSelectedClient] = useState('');
  const [rnc, setRnc] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ncf, setNcf] = useState('');
  const [fulgonNumber, setFulgonNumber] = useState('');
  const [price, setPrice] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

  const handleClientSelection = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    const client = defaultClients.find(c => c.id === clientId);
    if (client) {
      setRnc(client.rnc);
      setName(client.name);
      setPhone(client.phone);
    } else {
      setRnc('');
      setName('');
      setPhone('');
    }
  };

  const handleSubmit = () => {
    const clientData = {
      rnc: isNewClient ? rnc : defaultClients.find(c => c.id === selectedClient)?.rnc,
      name: isNewClient ? name : defaultClients.find(c => c.id === selectedClient)?.name,
      phone: isNewClient ? phone : defaultClients.find(c => c.id === selectedClient)?.phone,
      ncf,
      fulgonNumber,
      price,
      invoiceDate,
      type: operationType,
    };
    onClientSubmit(clientData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isNewClient ? 'Registrar Cliente' : 'Seleccionar Cliente'} para {operationType === 'import' ? 'Importación' : 'Exportación'}
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <SharedButton
            onClick={() => setIsNewClient(true)}
            className={`px-6 py-2 rounded-full ${isNewClient ? 'bg-red-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Nuevo
          </SharedButton>
          <SharedButton
            onClick={() => setIsNewClient(false)}
            className={`px-6 py-2 rounded-full ${!isNewClient ? 'bg-red-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Existente
          </SharedButton>
        </div>

        {!isNewClient && (
          <div className="mb-4">
            <label htmlFor="client-select" className="block text-gray-700 text-sm font-medium mb-2">
              Seleccionar Cliente Existente
            </label>
            <select
              id="client-select"
              value={selectedClient}
              onChange={handleClientSelection}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 transition duration-300 ease-in-out"
            >
              <option value="">-- Selecciona un cliente --</option>
              {defaultClients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} (RNC: {client.rnc})
                </option>
              ))}
            </select>
          </div>
        )}

        {isNewClient && (
          <div className="space-y-4 mb-4">
            <SharedInput placeholder="RNC" value={rnc} onChange={(e) => setRnc(e.target.value)} />
            <SharedInput placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <SharedInput placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        )}

        <div className="space-y-4 mb-6">
          <SharedInput placeholder="NCF" value={ncf} onChange={(e) => setNcf(e.target.value)} />
          <SharedInput placeholder="Número de Fulgón" value={fulgonNumber} onChange={(e) => setFulgonNumber(e.target.value)} />
          <SharedInput type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} />
          <SharedInput type="date" placeholder="Fecha de Factura" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
        </div>

        <SharedButton
          onClick={handleSubmit}
          className="bg-red-800 text-white hover:bg-red-900 mb-4"
        >
          Guardar Factura
        </SharedButton>
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

export default ClientForm;