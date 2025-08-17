# TransCaribbean - Sistema de Gestión de Transporte

Sistema completo para la gestión de importaciones y exportaciones de TransCaribbean, con frontend React y backend Node.js.

## 🚀 Características

- **Panel Principal**: Dashboard con gráficos de ventas y estadísticas
- **Gestión de Clientes**: Crear y seleccionar clientes existentes
- **Gestión de Facturas**: Registro de operaciones de importación/exportación
- **Exportación a Excel**: Generación automática de reportes
- **Base de Datos MySQL**: Almacenamiento persistente de datos
- **API REST**: Backend robusto y escalable

## 🛠️ Tecnologías

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Node.js, Express, MySQL
- **Base de Datos**: MySQL
- **Reportes**: ExcelJS para generación de archivos Excel

## 📋 Requisitos Previos

- Node.js 16+ 
- MySQL 8.0+
- npm o yarn

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/Javiei/TransCaribbean.git
cd TransCaribbean
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_password
DB_NAME=transcaribbean
PORT=5000
```

### 3. Configurar la Base de Datos
Crear la base de datos y las tablas necesarias:

```sql
CREATE DATABASE transcaribbean;
USE transcaribbean;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(255),
  rnc VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE facturas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL,
  detalle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

### 4. Configurar el Frontend
```bash
cd ..
npm install
```

### 5. Configurar la URL de la API
Editar `src/config.js` y cambiar la URL de la API según tu configuración:

```javascript
// Para desarrollo local
BASE_URL: 'http://localhost:5000/api'

// Para producción (tu VPS)
BASE_URL: 'https://tu-vps.com/api'
```

## 🚀 Ejecución

### Backend
```bash
cd backend
npm run dev  # Modo desarrollo con nodemon
# o
npm start    # Modo producción
```

### Frontend
```bash
npm start    # Se abrirá en http://localhost:3000
```

## 📊 Uso del Sistema

1. **Panel Principal**: Visualiza estadísticas y gráficos de ventas
2. **Importar**: Registra operaciones de importación
3. **Exportar**: Registra operaciones de exportación
4. **Clientes**: Gestiona clientes existentes o crea nuevos
5. **Reportes**: Descarga reportes en Excel

## 🔧 Configuración de Producción

### Variables de Entorno
- `DB_HOST`: Host de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASS`: Contraseña de la base de datos
- `DB_NAME`: Nombre de la base de datos
- `PORT`: Puerto del servidor (opcional, default: 5000)

### Seguridad
- Cambiar credenciales por defecto
- Configurar firewall
- Usar HTTPS en producción
- Implementar autenticación si es necesario

## 📝 Estructura del Proyecto

```
TransCaribbean/
├── backend/           # Servidor Node.js
│   ├── routes/       # Rutas de la API
│   ├── db.js         # Configuración de base de datos
│   └── index.js      # Servidor principal
├── src/              # Frontend React
│   ├── components/   # Componentes React
│   ├── utils/        # Utilidades y servicios
│   └── config.js     # Configuración
└── public/           # Archivos estáticos
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas, contacta al equipo de desarrollo.
