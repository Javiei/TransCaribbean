import API_CONFIG from '../config';

const API_BASE_URL = API_CONFIG.BASE_URL;

class ApiService {
  // Clientes
  static async getClientes() {
    try {
      const response = await fetch(`${API_BASE_URL}/clientes`);
      if (!response.ok) throw new Error('Error al obtener clientes');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clientes:', error);
      throw error;
    }
  }

  static async createCliente(clienteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
      });
      if (!response.ok) throw new Error('Error al crear cliente');
      return await response.json();
    } catch (error) {
      console.error('Error creating cliente:', error);
      throw error;
    }
  }

  // Facturas
  static async getFacturas() {
    try {
      const response = await fetch(`${API_BASE_URL}/facturas`);
      if (!response.ok) throw new Error('Error al obtener facturas');
      return await response.json();
    } catch (error) {
      console.error('Error fetching facturas:', error);
      throw error;
    }
  }

  static async createFactura(facturaData) {
    try {
      const response = await fetch(`${API_BASE_URL}/facturas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaData),
      });
      if (!response.ok) throw new Error('Error al crear factura');
      return await response.json();
    } catch (error) {
      console.error('Error creating factura:', error);
      throw error;
    }
  }

  // Rutas (por ahora las mantenemos como constantes, pero podrían venir de la BD)
  static getRutas() {
    return [
      'Puerto Rico - República Dominicana',
      'República Dominicana - Puerto Rico',
      'Puerto Rico - Jamaica',
      'Jamaica - Puerto Rico',
      'Puerto Rico - Haití',
      'Haití - Puerto Rico',
      'Puerto Rico - Cuba',
      'Cuba - Puerto Rico',
      'Puerto Rico - Bahamas',
      'Bahamas - Puerto Rico'
    ];
  }

  // Descargar Excel
  static async downloadExcel() {
    try {
      const response = await fetch(`${API_BASE_URL}/facturas/excel`);
      if (!response.ok) throw new Error('Error al descargar Excel');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'facturas.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading Excel:', error);
      throw error;
    }
  }
}

export default ApiService;
