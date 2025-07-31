export const getMonthName = (monthNumber = 0) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('es-ES', { month: 'long' });
};

export const processInvoiceData = (invoices = [], routes = []) => {
  const monthlySales = Array(12).fill(0);
  const clientSales = {};
  const routeSales = {};

  routes.forEach(route => {
    routeSales[route] = 0;
  });

  invoices.forEach(invoice => {
    const month = new Date(invoice.invoiceDate).getMonth();
    monthlySales[month] += invoice.price;

    if (clientSales[invoice.name]) {
      clientSales[invoice.name] += invoice.price;
    } else {
      clientSales[invoice.name] = invoice.price;
    }

    if (routeSales[invoice.route]) {
      routeSales[invoice.route] += invoice.price;
    } else {
      routeSales[invoice.route] = invoice.price;
    }
  });

  const topClients = Object.entries(clientSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, sales]) => ({ name, sales }));

  const salesByRoute = Object.entries(routeSales)
    .map(([route, sales]) => ({ route, sales }));

  return { monthlySales, topClients, salesByRoute };
};