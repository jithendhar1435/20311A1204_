import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleTrain = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    // Fetch the details of a specific train from the API
    const fetchTrain = async () => {
      try {
        const response = await axios.get(`http://104.211.219.98/train/trains/${trainNumber}`);
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train:', error);
      }
    };

    fetchTrain();
  }, [trainNumber]);

  if (!train) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <h3>{train.trainName}</h3>
      <p>Train Number: {train.trainNumber}</p>
      {/* Display seat availability and prices */}
      <p>Seats Available - Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
      <p>Price - Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
    </div>
  );
};

export default SingleTrain;
