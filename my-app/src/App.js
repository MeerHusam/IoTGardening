import React, { useState , useEffect } from 'react';
import SensorChart from './SensorChart';
import Profile from './Profile';
import './App.css';
import { database } from './firebase'; // import the database from your firebase.js
import { ref, onValue, off,get } from 'firebase/database';
function determineCondition(temperature, humidity, soilMoisture) {
  if (temperature > 27 || temperature < 16) {
    return "bad";
  }
  if (humidity > 80 || humidity < 40) {
    return "bad";
  }
  if (soilMoisture > 80 || soilMoisture < 40) {
    return "bad";
  }
  return "good";
}

const saveDataToServer = async (sensorData) => {
  try {
    const response = await fetch('http://localhost:3001/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sensorData),
    });

    if (response.ok) {
      console.log('Data saved successfully');
    } else {
      console.error('Error saving data');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

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
  const [waterlevelData, setWaterlevelData] = useState([]);


  useEffect(() => {
    const sensorRef = ref(database, 'Sensor');
  
    const unsubscribe =  onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const timestamp = new Date().toISOString();
        const condition = determineCondition(
          data.temperature_celsius, 
          data.humidity_level, 
          data.soil_moisture_level
        );
        const mappedData=({
          temperature: data.temperature_celsius,
          soilMoisture:data.soil_moisture_level,
          humidity: data.humidity_level,
          timestamp,
          condition,
        });
        setSensorData(mappedData);
        saveDataToServer(mappedData);
  
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

  const handleAddWater = () => {
    console.log('Water added to the plant!');

    // Here you can add the actual functionality you need
    // For example, updating the state or making an API call
  };


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
                <span className="data-label">Humidity:</span>
                <span className="data-value">{sensorData.humidity}%</span>
              </div>
              <div className="grid-item">
                <span className="data-label">Soil Moisture:</span>
                <span className="data-value">{sensorData.soilMoisture}%</span>
              </div>
            </div>
            <div className="add-water-button-container">
              <button className="add-water-button" onClick={handleAddWater}>
                Add Water
              </button>
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