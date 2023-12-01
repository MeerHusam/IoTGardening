import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SensorChart = ({ title, data }) => {
  const chartData = {
    labels: data.map(d => d.time),
    datasets: [
      {
        label: title,
        data: data.map(d => d.value),
        fill: true,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        tension: 0.3, // This will make the line a bit smoother
        pointRadius: 0, // Remove the points for a cleaner look
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        position: 'top',
        align: 'start',
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (seconds)',
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: `Value (${getUnits(title)})`,
        },
      },
    },
  };

  // Helper function to get units based on the title
  function getUnits(title) {
    switch(title.toLowerCase()) {
      case 'temperature':
        return '°C';
      case 'humidity':
        return '%';
      case 'soil moisture':
        return '%';
      default:
        return '';
    }
  }

  return (
    <div style={{ height: '400px', width: '100%' }}> 
      <Line data={chartData} options={chartOptions} />
    </div>
  );

  
};

export default SensorChart;

