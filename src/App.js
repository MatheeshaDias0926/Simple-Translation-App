import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState("");
  const [isRtl, setIsRtl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translationHistory, setTranslationHistory] = useState([]);
  const [showNotification, setShowNotification] = useState("");

  const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

  // Fetch supported languages on component mount
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`
        );
        setLanguages(response.data.data.languages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    // Load translation history from localStorage
    const savedHistory = localStorage.getItem("translationHistory");
    if (savedHistory) setTranslationHistory(JSON.parse(savedHistory));

    if (apiKey) fetchLanguages();
  }, [apiKey]);

  const handleTranslate = async () => {
    const textToTranslate = inputText.trim();
    setError("");
    setTranslatedText("");

    if (!textToTranslate) {
      setError("Please enter text to translate.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
          q: textToTranslate,
          target: targetLanguage,
          format: "text",
        }
      );

      const translationData = response.data?.data?.translations?.[0];
      if (!translationData) throw new Error("Invalid response structure");

      const newTranslation = {
        source: textToTranslate,
        translation: translationData.translatedText,
        language: targetLanguage,
        timestamp: new Date().toISOString(),
      };

      setTranslatedText(translationData.translatedText);
      setIsRtl(false);

      // Update translation history
      const updatedHistory = [
        newTranslation,
        ...translationHistory.slice(0, 4),
      ];
      setTranslationHistory(updatedHistory);
      localStorage.setItem(
        "translationHistory",
        JSON.stringify(updatedHistory)
      );
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      showTemporaryNotification("Copied to clipboard!");
    } catch (error) {
      showTemporaryNotification("Failed to copy");
    }
  };

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLanguage;
      speechSynthesis.speak(utterance);
    } else {
      showTemporaryNotification("Text-to-speech not supported in this browser");
    }
  };

  const showTemporaryNotification = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(""), 2000);
  };

  const toggleDirection = () => {
    setIsRtl(!isRtl);
  };

  const clearHistory = () => {
    setTranslationHistory([]);
    localStorage.removeItem("translationHistory");
  };

  return (
    <div className="app">
      <h1>Advanced Translation App</h1>

      <div className="language-selector">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          disabled={isLoading}
        >
          {languages.map((lang) => (
            <option key={lang.language} value={lang.language}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <textarea
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
          {isLoading ? (
            <>
              Translating...
              <div className="loading"></div>
            </>
          ) : (
            "Translate"
          )}
        </button>

        <button onClick={toggleDirection} disabled={!translatedText}>
          Switch to {isRtl ? "LTR" : "RTL"}
        </button>
      </div>

      {error && <div className="notification error">{error}</div>}
      {showNotification && (
        <div className="notification">{showNotification}</div>
      )}

      {translatedText && (
        <div className="result">
          <h3>Translated Text:</h3>
          <textarea
            readOnly
            value={translatedText}
            style={{ direction: isRtl ? "rtl" : "ltr" }}
          />
          <div className="result-controls">
            <button onClick={copyToClipboard}>Copy</button>
            <button onClick={speakText}>Speak</button>
          </div>
        </div>
      )}

      {translationHistory.length > 0 && (
        <div className="history">
          <div className="history-header">
            <h3>Translation History</h3>
            <button onClick={clearHistory}>Clear History</button>
          </div>
          {translationHistory.map((item, index) => (
            <div key={index} className="history-item">
              <p className="source">{item.source}</p>
              <p className="translation">{item.translation}</p>
              <div className="meta">
                <span>{new Date(item.timestamp).toLocaleString()}</span>
                <span>{item.language.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
