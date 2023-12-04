import React, { useState , useEffect } from 'react';
import SensorChart from './SensorChart';
import Profile from './Profile';
import './App.css';
import { database } from './firebase'; // import the database from your firebase.js
import { set, ref, onValue, off,get } from 'firebase/database';
import dropletImage from './RainDroplet.png';
import weatherIcon from './weather-icon.png';
import humidityIcon from './HumidityIcon.png';
import soilMoistureIcon from './SoilMoistureIcon.png';

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


const WaterLevelIndicator = () => {
  return (
    <img src={dropletImage} alt="Water Level" className="droplet-icon" />
  );
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
  const [waterlevelData, setWaterlevelData] = useState(50);
  const [sliderValue, setSliderValue] = React.useState(50)

  useEffect(() => {
    // Fetching logic here
    // setWaterLevel(fetchedWaterLevel);
  }, []);


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
    const pumpRef = ref(database, 'Pump/water_pump');
    set(pumpRef, true)
      .then(() => {
        console.log('Pump value set to true');
      })
      .catch((error) => {
        console.error('Error updating pump value:', error);
      });
  };

  const handleSliderChange = (event) => {
    // Assuming `yourStateValue` is your state variable and `setYourStateValue` is the setter.
    //setYourStateValue(event.target.value);
  };
  
  


  return (
    <div className="App">
      {currentPage === 'dashboard' ? (
        <>
          <button onClick={navigateToProfile} className="navigate-button">Go to Profile</button>
          <header className="App-header">
            <div className="header-row">
              <h1>Sensor Data Dashboard</h1>
              <div className="water-level-indicator-container">
                <WaterLevelIndicator />
              </div>
            </div>
          </header> 
            {/*<div className = 'sensor-data'>*/}
              <div className="grid-container">
                <div className="grid-itemA">
                  <div className="temperature-details">
                    <span className="data-label">Temperature:</span>
                    <span className="data-value">{sensorData.temperature}°C</span>
                  </div>
                  <div className="temperature-icon">
                    <img src={weatherIcon} alt="Temperature Icon" />
                  </div>
                </div>
                <div className="grid-itemB">
                  <div className="temperature-details">
                    <span className="data-label">Humidity:</span>
                    <span className="data-value">{sensorData.humidity}%</span>
                  </div>
                  <div className="temperature-icon">
                    <img src={humidityIcon} alt="Humidity Icon" />
                  </div>
                  
                </div>
                <div className="grid-itemC">
                  <div className="temperature-details">
                    <span className="data-label">Soil Moisture:</span>
                    <span className="data-value">{sensorData.soilMoisture}%</span>
                  </div>
                  <div className="temperature-icon">
                    <img src={soilMoistureIcon} alt="Soil Moisture Icon" />
                  </div>
                </div>
              </div>
              {/*<div className="add-water-button-container">
                <button className="add-water-button" onClick={handleAddWater} >
                  Add Water
                </button>
      </div>*/}
            {/*</div>*/}
          {/*</header>*/}
          <main>
          <div className="chart-container">
  <SensorChart title="Temperature" data={temperatureData} />
  <div className="graphContainer">
    <SensorChart title="Humidity" data={humidityData} />
    <div className="slider-section">
        <div className="slider-title">Update Threshold</div>
        <div className="slider-container">
          <input
            type="range"
            className="slider"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />
        </div>
        <div className="slider-value">Value: {sliderValue}</div>
    </div>
  </div>
  <div className ="graphContainer">
    <SensorChart title="Soil Moisture" data={moistureData} />
    <div className="button-container">
        <button onClick={() => console.log('Water added')}>Pour Water</button>
    </div>
  </div>
  {/*<div className="slider-button-container">*/}
    
    {/*<div className="slider-section">
      <div className="slider-container">
        <input
          type="range"
          className="slider"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
        />
      </div>
      <div className="slider-value">Value: {sliderValue}</div>
    </div>*/}
    {/*<button className="add-water-button" onClick={handleAddWater}>Pour Water</button>*/}
    
  {/*</div>*/}

  
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