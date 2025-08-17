import React, { useState } from 'react';
import MainPanel from './components/MainPanel';
import RouteSelection from './components/RouteSelection';
import ClientForm from './components/ClientForm';
import SuccessMessage from './components/SuccessMessage';
import ExportPanel from './components/ExportPanel';

const App = () => {
  const [currentPage, setCurrentPage] = useState('mainPanel'); // 'mainPanel', 'routeSelection', 'clientForm', 'success', 'exportPanel'
  const [selectedRoute, setSelectedRoute] = useState('');
  const [operationType, setOperationType] = useState('import'); // 'import' or 'export'

  const handleSelectOption = (option) => {
    setOperationType(option);
    if (option === 'import') {
      setCurrentPage('routeSelection');
    } else if (option === 'export') {
      setCurrentPage('exportPanel');
    }
  };

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    setCurrentPage('clientForm');
  };

  const handleClientSubmit = (clientData) => {
    if (clientData.success) {
      setCurrentPage('success');
    }
    // Si hay error, se maneja en el componente ClientForm
  };

  const handleBack = () => {
    if (currentPage === 'routeSelection' || currentPage === 'exportPanel') {
      setCurrentPage('mainPanel');
    } else if (currentPage === 'clientForm') {
      setCurrentPage('routeSelection');
    } else if (currentPage === 'success') {
      setCurrentPage('mainPanel');
    }
  };

  const handleStartExportForm = () => {
    setCurrentPage('routeSelection');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'mainPanel':
        return <MainPanel onSelectOption={handleSelectOption} />;
      case 'routeSelection':
        return <RouteSelection onSelectRoute={handleSelectRoute} onBack={handleBack} operationType={operationType} />;
      case 'clientForm':
        return <ClientForm onClientSubmit={handleClientSubmit} onBack={handleBack} operationType={operationType} />;
      case 'success':
        return <SuccessMessage onDone={handleBack} />;
      case 'exportPanel':
        return <ExportPanel onBack={handleBack} onStartExportForm={handleStartExportForm} />;
      default:
        return <MainPanel onSelectOption={handleSelectOption} />;
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {renderPage()}
    </div>
  );
};

export default App;