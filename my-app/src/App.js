import React, { useState, useEffect } from 'react';
import SensorChart from './SensorChart';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState({
    temperature: '--',
    soilMoisture: '--',
    humidity: '--',
  });
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:8080');

    // Connection opened
    socket.addEventListener('open', function (event) {
      console.log('Connected to the WebSocket server');
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      setSensorData(data);
    });

    // Clean up on unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensor Data Dashboard</h1>
        <div className="grid-container">
          <div className="grid-item">
            <span className="data-label">Temperature:</span>
            <span className="data-value">{sensorData.temperature}°C</span>
          </div>
          <div className="grid-item">
            <span className="data-label">Soil Moisture:</span>
            <span className="data-value">{sensorData.soilMoisture}%</span>
          </div>
          <div className="grid-item">
            <span className="data-label">Humidity:</span>
            <span className="data-value">{sensorData.humidity}%</span>
          </div>
        </div>
      </header>
      <main>
        <div className="chart-container">
          <SensorChart title="Temperature" data={temperatureData} />
          <SensorChart title="Humidity" data={humidityData} />
          <SensorChart title="Soil Moisture" data={moistureData} />
        </div>
      </main>
    </div>
  );
}

export default App;
