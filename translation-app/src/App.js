import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Optional styling

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [isRtl, setIsRtl] = useState(false); // State to track RTL/LTR direction

  // Load API key from environment variables
  const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY; // Ensure this is set in your .env file

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError("Please enter text to translate.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: inputText,
          target: "en",
          format: "text",
        }
      );

      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      setError("Translation failed. Please try again.");
      console.error("Translation Error:", error);
    }
  };

  const toggleDirection = () => {
    setIsRtl(!isRtl); // Toggle between RTL and LTR
  };

  return (
    <div className="app" style={{ direction: isRtl ? "rtl" : "ltr" }}>
      <h1>Simple Translation App</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
      />
      <button onClick={handleTranslate}>Translate</button>

      <button onClick={toggleDirection}>
        Switch to {isRtl ? "LTR" : "RTL"}
      </button>

      {error && <p className="error">{error}</p>}
      {translatedText && (
        <div className="result">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
