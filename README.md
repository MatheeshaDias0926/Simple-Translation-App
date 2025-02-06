Simple Translation App

A simple React-based translation web app that uses the Google Translate API to translate text input from one language to another. The app supports both Left-to-Right (LTR) and Right-to-Left (RTL) languages, with dynamic language direction switching.

Features

Text Translation: Translate text from any supported language to English (or modify the target language).
RTL Support: Proper display for Right-to-Left languages like Arabic, Hebrew, etc.
Dynamic LTR/RTL Switching: Toggle between LTR and RTL modes on the fly for optimal viewing of translated content.
Error Handling: Displays appropriate error messages when no input is provided or translation fails.
Tech Stack

Frontend: React
Backend: Google Translate API (for text translation)
Styling: CSS (Supports dynamic RTL and LTR layout)
Installation

1. Clone the repository
   To get started with the app, clone the repository to your local machine:

git clone https://github.com/MatheeshaDias0926/Simple-Translation-App.git 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies:

cd simple-translation-app
npm install

3. Add Your Google Translate API Key
   To interact with the Google Translate API, you'll need an API key. You can obtain your API key from the Google Cloud Console.

Once you have the key:

Create a .env file in the root of the project (if it doesn't already exist).
Add the following line to your .env file:
REACT_APP_GOOGLE_TRANSLATE_API_KEY=your-api-key-here

4. Run the Application
   After installing the dependencies and adding the API key, run the app locally:

npm start
This will start the development server and open the app in your default browser. You can now interact with the translation app.

Usage

Enter Text: Type the text you wish to translate in the textarea.
Translate: Click the "Translate" button to fetch the translated text.
Switch Layout: Use the "Switch to RTL" or "Switch to LTR" button to toggle between Right-to-Left (RTL) and Left-to-Right (LTR) layout. This helps in viewing translated content in a proper layout for RTL languages.
File Structure

/public
/index.html - Main HTML file
/src
/App.js - Main React component for the translation functionality
/App.css - Styling for the app
/index.js - Entry point of the app
/.env - Environment variables (store API key)
.gitignore - Git ignore file
package.json - Dependencies and project metadata
README.md - This file
Contributing

Acknowledgements

Google Translate API: Provides text translation functionality for the app.
React: Used for building the user interface and handling app logic.

