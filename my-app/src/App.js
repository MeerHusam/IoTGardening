

import React, { useState , useEffect } from 'react';
import SensorChart from './SensorChart';
import Profile from './Profile';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sensorData, setSensorData] = useState({
    temperature: '--',
    soilMoisture: '--',
    humidity: '--',
  });
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [moistureData, setMoistureData] = useState([]);

  /*useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.addEventListener('open', function (event) {
      console.log('Connected to the WebSocket server');
    });
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
  
      // Update the sensorData state with the latest readings
      setSensorData({
        temperature: data.temperature || sensorData.temperature,
        soilMoisture: data.moisture || sensorData.soilMoisture,
        humidity: data.humidity || sensorData.humidity,
      });
  
      // Update the arrays for the charts
      if (data.temperature) {
        setTemperatureData(prevTemps => [...prevTemps, data.temperature]);
      }
      if (data.humidity) {
        setHumidityData(prevHumidities => [...prevHumidities, data.humidity]);
      }
      if (data.moisture) {
        setMoistureData(prevMoistures => [...prevMoistures, data.moisture]);
      }
    });
    return () => {
      socket.close();
    };
  }, [sensorData]);*/

  useEffect(() => {
    // Sample data array
    const sampleData = [
      { temperature: 23, humidity: 45, moisture: 12 },
      { temperature: 27, humidity: 50, moisture: 15 },
      // ... Add more sample data points here
    ];
  
    let dataIndex = 0;
  
    // Update state with a new data point every 2 seconds
    const interval = setInterval(() => {
      if (dataIndex < sampleData.length) {
        const data = sampleData[dataIndex++];
        setSensorData({
          temperature: data.temperature,
          soilMoisture: data.moisture,
          humidity: data.humidity,
        });
        setTemperatureData(prev => [...prev, data.temperature]);
        setHumidityData(prev => [...prev, data.humidity]);
        setMoistureData(prev => [...prev, data.moisture]);
      }
    }, 2000);
  
    // Cleanup the interval
    return () => clearInterval(interval);
  
  }, []);
  
  

  // setTemperatureData([23, 34, 45, 54, 56, 77, 67, 88, 67, 120]);

  const navigateToProfile = () => setCurrentPage('profile');
  const navigateToDashboard = () => setCurrentPage('dashboard');

  return (
    <div className="App">
      {currentPage === 'dashboard' ? (
        <>
          <button onClick={navigateToProfile} className="navigate-button">Go to Profile</button>
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
        </>
      ) : (
        <>
          <button onClick={navigateToDashboard} className="navigate-button">Back to Dashboard</button>
          <Profile />
        </>
      )}
    </div>
  );
}

export default App;







