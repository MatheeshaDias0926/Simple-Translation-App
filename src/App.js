import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [isRtl, setIsRtl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

  const handleTranslate = async () => {
    const textToTranslate = inputText.trim();
    setError("");
    setTranslatedText("");

    if (!textToTranslate) {
      setError("Please enter text to translate.");
      return;
    }

    if (!apiKey) {
      setError("API configuration error. Please try again later.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: textToTranslate,
          target: "en",
          format: "text",
        }
      );

      const translationData = response.data?.data?.translations?.[0];
      if (!translationData) {
        throw new Error("Invalid response structure");
      }

      setTranslatedText(translationData.translatedText);
      setIsRtl(false); // Reset to LTR for English translations
    } catch (error) {
      console.error("Translation Error:", error);
      setError(
        error.response?.data?.error?.message ||
          "Translation failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDirection = () => {
    setIsRtl(!isRtl);
  };

  return (
    <div className="app">
      <h1>Simple Translation App</h1>

      <label htmlFor="input-text" className="sr-only">
        Enter text to translate
      </label>
      <textarea
        id="input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
        disabled={isLoading}
      />

      <div className="controls">
        <button
          onClick={handleTranslate}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? "Translating..." : "Translate"}
        </button>

        <button onClick={toggleDirection} disabled={!translatedText}>
          Switch to {isRtl ? "LTR" : "RTL"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {translatedText && (
        <div className="result" style={{ direction: isRtl ? "rtl" : "ltr" }}>
          <h3>Translated Text:</h3>
          <textarea
            readOnly
            value={translatedText}
            aria-label="Translated text"
            style={{ direction: isRtl ? "rtl" : "ltr" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
