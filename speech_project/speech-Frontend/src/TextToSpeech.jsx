import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Importing the external CSS file

function TextToSpeech() {
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en"); // Default language is English

    const handleTextToSpeech = async () => {
        if (text.trim()) {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/text-to-speech/", {
                    params: { text, language },
                    responseType: "blob" // Ensure we get audio as a binary file
                });

                const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play(); // Play audio immediately

                setText(""); // Clear input after conversion
            } catch (error) {
                console.error("Error in TTS conversion:", error);
                alert("There was an error converting the text to speech.");
            }
        } else {
            alert("Please enter text before converting.");
        }
    };

    return (
        <div className="tts-container--main">
            <div className="tts-section">
                <h3>Text to Speech</h3>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text"
                    className="input-text"
                />
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="mr">Marathi</option>
                </select>

                <button onClick={handleTextToSpeech} className="convert-btn">
                    Convert to Speech
                </button>
            </div>
        </div>
    );
}

export default TextToSpeech;
