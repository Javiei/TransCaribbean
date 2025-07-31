import React from 'react';

const ChartPie = ({ data = [], title = 'Top Clientes', colors = ['#8B0000', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB'] }) => {
  const total = data.reduce((sum, item) => sum + item.sales, 0);
  let cumulativePercentage = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.sales / total) * 100;
    const startAngle = cumulativePercentage;
    cumulativePercentage += percentage;
    const endAngle = cumulativePercentage;

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const x1 = 50 + 50 * Math.cos(2 * Math.PI * startAngle / 100);
    const y1 = 50 + 50 * Math.sin(2 * Math.PI * startAngle / 100);
    const x2 = 50 + 50 * Math.cos(2 * Math.PI * endAngle / 100);
    const y2 = 50 + 50 * Math.sin(2 * Math.PI * endAngle / 100);

    return {
      path: `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      color: colors[index % colors.length],
      label: `${item.name || item.route} ($${item.sales})`,
      percentage: percentage.toFixed(1)
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {segments.map((segment, index) => (
            <path key={index} d={segment.path} fill={segment.color} title={segment.label} />
          ))}
        </svg>
        <div className="mt-4 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: segment.color }}></span>
              <span className="text-sm text-gray-700">{segment.label} ({segment.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartPie;