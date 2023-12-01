// Profile.js
/*import React from 'react';
import './Profile.css';

const Profile = () => {
    // Placeholder user data
    const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        location: "Earth",
        // Additional IoT-related settings or data
        notificationFrequency: "Daily",
        preferredMoistureLevel: "45%",
        // Add other relevant user details or preferences
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2>User Profile</h2>
            </div>
            <div className="profile-details">
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Location:</strong> {userData.location}</p>
                <p><strong>Notification Frequency:</strong> {userData.notificationFrequency}</p>
                <p><strong>Preferred Soil Moisture Level:</strong> {userData.preferredMoistureLevel}</p>
                
            </div>
        </div>
    );
};

export default Profile;*/

import React from 'react';
import './Profile.css';
// Import additional components as needed

const Profile = () => {
    // Placeholder data - replace with real data and logic
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePicture: '/path/to/image.jpg' // Replace with actual image path
    };

    const devices = [
        { name: 'Device 1', type: 'Sensor', status: 'Online' },
        { name: 'Device 2', type: 'Sensor', status: 'Offline' }
        // ... more devices
    ];

    // Replace with actual data and components for real-time and historical data
    const realTimeData = <div className="data-chart">Real-time Data Chart</div>;
    const historicalData = <div>Historical Data View</div>;

    return (
        <div className="profile-container">
            <div className="profile-section user-info-section">
                <div className="user-info-picture" style={{ backgroundImage: `url(${user.profilePicture})` }}></div>
                <div className="user-info-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Other user details */}
                </div>
            </div>

            <div className="profile-section device-list">
                {devices.map((device, index) => (
                    <div key={index} className="device-card">
                        <span>{device.name} ({device.type})</span>
                        <span>Status: {device.status}</span>
                    </div>
                ))}
            </div>

            <div className="profile-section data-display">
                {realTimeData}
            </div>

            <div className="profile-section historical-data">
                {historicalData}
            </div>

            {/* Additional sections for alerts, location, device configuration, etc. */}
            {/* Each of these sections should be rendered as needed, with their respective data and functionalities */}
        </div>
    );
};

export default Profile;


