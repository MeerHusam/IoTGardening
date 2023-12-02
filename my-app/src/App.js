import React, { useState , useEffect } from 'react';
import SensorChart from './SensorChart';
import Profile from './Profile';
import './App.css';
import { database } from './firebase'; // import the database from your firebase.js
import { ref, onValue, off } from 'firebase/database';
function mapToPercentage(value) {
  const maxValue = 4095;
  return (value / maxValue * 100).toFixed(2); // toFixed(2) 用于保留两位小数
}


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


  useEffect(() => {
    const sensorRef = ref(database, 'Sensor');
  
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData({
          temperature: data.temperature_celsius,
          soilMoisture:mapToPercentage(data.soil_moisture_level),
          humidity: data.humidity_level,
        });
  
        const currentTime = new Date().toLocaleTimeString();
        setTemperatureData(prev => [...prev, { time: currentTime, value: data.temperature_celsius }]);
        setHumidityData(prev => [...prev, { time: currentTime, value: data.humidity_level }]);
        setMoistureData(prev => [...prev, { time: currentTime, value: data.soil_moisture_level }]);
      }
    });
  
    // Cleanup the subscription
    return () => {
      unsubscribe();
    };
  
  }, []);


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