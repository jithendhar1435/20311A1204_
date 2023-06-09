import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTrains = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch all trains data from the API
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://104.211.219.98/train/trains');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>All Trains</h1>
      {/* Render the trains data */}
      {trains.map((train) => (
        <div key={train.trainNumber}>
          <h3>{train.trainName}</h3>
          <p>Train Number: {train.trainNumber}</p>
          {/* Display seat availability and prices */}
          <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
          <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
          <p>Delayed By: {train.delayedBy} minutes</p>
        </div>
      ))}
    </div>
  );
};

export default AllTrains;
