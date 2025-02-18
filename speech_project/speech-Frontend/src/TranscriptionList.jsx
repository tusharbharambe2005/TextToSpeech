// TranscriptionList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TranscriptionList.css'; // Importing CSS for Transcription List

const TranscriptionList = ({ goBack }) => {
  const [savedTranscriptions, setSavedTranscriptions] = useState([]);

  // Fetch stored transcriptions from the backend
  const fetchSavedTranscriptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-transcriptions/");
      if (response.data.transcriptions && Array.isArray(response.data.transcriptions)) {
        setSavedTranscriptions(response.data.transcriptions.reverse()); // Show latest first
      }
    } catch (error) {
      console.error("Error fetching transcriptions:", error);
    }
  };

  useEffect(() => {
    fetchSavedTranscriptions();
  }, []);

  return (
    <div className="transcription-list-container">
      <h3>Previously Converted Transcriptions</h3>
      <button className="back-btn" onClick={goBack}>Back to Speech-to-Text</button>

      <div className="transcription-list">
        {savedTranscriptions.length === 0 ? (
          <p>No transcriptions available.</p>
        ) : (
          <ul>
            {savedTranscriptions.map((item) => (
              <li key={item.id} className="transcription-item">
                <strong>{item.text}</strong>
                <br />
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TranscriptionList;
