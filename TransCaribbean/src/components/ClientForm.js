import React, { useState, useEffect } from 'react';
import SharedButton from './SharedButton';
import SharedInput from './SharedInput';
import ApiService from '../utils/api';

const ClientForm = ({ onClientSubmit = () => {}, onBack = () => {}, operationType = 'import' }) => {
  const [isNewClient, setIsNewClient] = useState(true);
  const [selectedClient, setSelectedClient] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rnc, setRnc] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ncf, setNcf] = useState('');
  const [fulgonNumber, setFulgonNumber] = useState('');
  const [price, setPrice] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsData = await ApiService.getClientes();
        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleClientSelection = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setRnc(client.rnc || '');
      setName(client.nombre || '');
      setPhone(client.telefono || '');
    } else {
      setRnc('');
      setName('');
      setPhone('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let clientId = selectedClient;
      
      // Si es un cliente nuevo, crearlo primero
      if (isNewClient) {
        const newClient = await ApiService.createCliente({
          nombre: name,
          telefono: phone,
          email: '', // Campo requerido por la BD
          rnc: rnc
        });
        clientId = newClient.id;
      }

      // Crear la factura
      const facturaData = {
        cliente_id: clientId,
        total: parseFloat(price),
        fecha: invoiceDate,
        detalle: `NCF: ${ncf}, Fulgón: ${fulgonNumber}, Tipo: ${operationType}`
      };

      await ApiService.createFactura(facturaData);
      onClientSubmit({ success: true });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
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
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.nombre} (RNC: {client.rnc || 'N/A'})
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
          disabled={loading}
          className="bg-red-800 text-white hover:bg-red-900 mb-4 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar Factura'}
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