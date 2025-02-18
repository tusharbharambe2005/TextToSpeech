import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing CSS specific to SpeechToText

const SpeechToText = ({ fetchSavedTranscriptions }) => {
  const [transcription, setTranscription] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSpeechToText = async () => {
    setIsRecording(true); // Start recording state
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/speech-to-text/");
      setTranscription(response.data.transcription || response.data.error);

      // Refresh data after STT
      setTimeout(() => {
        fetchSavedTranscriptions();
      }, 1000);
    } catch (error) {
      console.error("Error converting speech to text:", error);
    } finally {
      setIsRecording(false); // End recording state
    }
  };

  return (
    <div className="stt-container-main">
      <h3>Convert Speech to Text</h3>
      <button className="start-recording-btn" onClick={handleSpeechToText} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <p className="transcription-text">{transcription}</p>
    </div>
  );
};

export default SpeechToText;
