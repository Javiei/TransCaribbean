import React from 'react';
import { getMonthName } from '../utils/helpers';

const ChartBar = ({ data = [], title = 'Ventas Mensuales', barColor = 'bg-red-800' }) => {
  const maxVal = Math.max(...data);
  const labels = Array.from({ length: data.length }, (_, i) => getMonthName(i + 1).substring(0, 3));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex items-end h-48 space-x-1 sm:space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-grow">
            <div
              className={`${barColor} rounded-t-md transition-all duration-500 ease-out`}
              style={{ height: `${(value / maxVal) * 100}%`, width: '100%' }}
              title={`${labels[index]}: $${value}`}
            ></div>
            <span className="text-xs text-gray-500 mt-1">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartBar;