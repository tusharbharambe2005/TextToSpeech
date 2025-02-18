import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
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

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/speech-to-text"); // Redirect to speech-to-text after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  const handleGoBack = () => setCurrentView("stt");
  const handleSwitchToTTS = () => setCurrentView("tts");
  const handleShowList = () => setCurrentView("list");

  const handleSpeechToText = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Speech-to-Text conversion completed!");
    }, 2000);
  };

  const handleTextToSpeech = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Text-to-Speech conversion completed!");
    }, 2000);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <>
          <nav className="navbar">
            <div className="nav-container">
              <p className="box">Speech and Text-to-Speech Converter</p>
              <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </div>
          </nav>

          <div className="app-container">
            
            <div className="content-container">
              {currentView === "stt" && (
                <div className="stt-tts-container">
                  <div className="stt-container">
                    <SpeechToText onSpeechToText={handleSpeechToText} />
                    <button className="switch-btn" onClick={handleSwitchToTTS}>Switch to Text-to-Speech</button>
                    <button className="list-btn" onClick={handleShowList}>Show Transcription List</button>
                  </div>
                  <div className="tts-container">
                    <TextToSpeech onTextToSpeech={handleTextToSpeech} />
                    <button className="switch-btn" onClick={handleGoBack}>Switch to Speech-to-Text</button>
                    <button className="list-btn" onClick={handleShowList}>Show Transcription List</button>
                  </div>
                </div>
              )}
              {currentView === "list" && <TranscriptionList goBack={handleGoBack} />}
            </div>
            {isLoading && <div className="loading-overlay"><p>Processing...</p></div>}
          </div>
        </>
      )}
    </>
  );
}

export default AppRouter;
