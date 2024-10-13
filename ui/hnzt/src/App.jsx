import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [batchInfo, setBatchInfo] = useState(null);
  const [runningText, setRunningText] = useState("");
  const [otherDetails, setOtherDetails] = useState(null);

  // Fetching data for batch info
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/batch-info')
      .then(response => response.json())
      .then(data => setBatchInfo(data))
      .catch(error => console.error('Error fetching batch info:', error));

    // Fetching running text
    fetch('http://127.0.0.1:5000/api/running-text')
      .then(response => response.json())
      .then(data => setRunningText(data.message))
      .catch(error => console.error('Error fetching running text:', error));

    // Fetching other details like location and feature use
    fetch('http://127.0.0.1:5000/api/other-details')
      .then(response => response.json())
      .then(data => setOtherDetails(data))
      .catch(error => console.error('Error fetching other details:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="brand">Hanz Tech Data Solutions</div>
          <div className="menu">
            <a href="/">Home</a>
            <a href="/about">About HanzTech</a>
            <a href="/courses">Courses</a>
            <a href="/placements">Placements</a>
            <a href="/trainers">Trainers</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>

        {/* Banner section with fixed text */}
        <div className="banner">
          <h1>DATAWAREHOUSE TRAINING</h1>
          <p>Experience the Best Placement Programs</p>
          <p className="placement">Placement Assistance</p>
        </div>

        {/* Display the batch info from API */}
        {batchInfo && (
          <div className="batch-info">
            <h2>New Batch Starting Soon</h2>
            <p><strong>Batch Name:</strong> {batchInfo.batch_name}</p>
            <p><strong>Start Date:</strong> {batchInfo.start_date}</p>
            <p><strong>Timing:</strong> {batchInfo.timing}</p>
            <p><strong>Location:</strong> {batchInfo.location}</p>
          </div>
        )}

        
        {runningText && (
          <div className="running-text">
            <marquee>{runningText}</marquee>
          </div>
        )}

        {/* Other details section */}
        {otherDetails && (
          <div className="other-details">
            <h3>Location: {otherDetails.location}</h3>
            <a href={otherDetails.map_url} target="_blank" rel="noopener noreferrer">
              View Map
            </a>
            <p><strong>Feature:</strong> {otherDetails.feature}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
