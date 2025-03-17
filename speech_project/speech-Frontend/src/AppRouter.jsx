import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Auth from "./LoginSingup";  // Replacing Login & Signup with Auth.js
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import TranscriptionList from "./TranscriptionList";
import "./AppRouter.css";    

function AppRouter() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem("isLoggedIn") === "true");
  const [currentView, setCurrentView] = useState("stt");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    navigate("/TextToSpeech"); // Redirect to TTS after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Auth onAuth={handleAuthSuccess} />} />
          <Route path="*" element={<Auth onAuth={handleAuthSuccess} />} />
        </Routes>
      ) : (
        <>
          <nav className="navbar">
            <div className="nav-container">
              <span className="box">Speech and Text-to-Speech Converter</span>
              <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </div>
          </nav>

          <div className="app-container">
            <div className="content-container">
              {currentView === "stt" && (
                <div className="stt-tts-container">
                  <div className="stt-container">
                    <SpeechToText />
                    {/* <button className="switch-btn" onClick={() => setCurrentView("tts")}>Switch to Text-to-Speech</button> */}
                    <button className="list-btn" onClick={() => setCurrentView("list")}>Show Transcription List</button>
                  </div>
                  <div className="tts-container">
                    <TextToSpeech />
                    {/* <button className="switch-btn" onClick={() => setCurrentView("stt")}>Switch to Speech-to-Text</button> */}
                    <button className="list-btn" onClick={() => setCurrentView("list")}>Show Transcription List</button>
                  </div>
                </div>
              )}
              {currentView === "list" && <TranscriptionList goBack={() => setCurrentView("stt")} />}
            </div>
            {isLoading && <div className="loading-overlay"><p>Processing...</p></div>}
          </div>
        </>
      )}
    </>
  );
}

export default AppRouter;
