// Configuración de la API
export const API_CONFIG = {
  // Cambia esta URL según tu configuración
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // Para producción, cambia a la URL de tu VPS
  // BASE_URL: 'https://tu-vps.com/api',
};

export default API_CONFIG;
