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

## v2.0 - besides from requirements (by matheesha)

Okay, the user wants to add several new features to their translation web app. Let me go through each feature and figure out how to implement them step by step.

First, the language selector dropdown. They need to fetch available languages from the Google Translate API. I'll add a state variable for the target language and another for the list of languages. When the component mounts, I'll make an API call to get the supported languages and populate the dropdown. The handleTranslate function should use the selected target language instead of hardcoding 'en'.

Next, copy-to-clipboard. Using navigator.clipboard.writeText is straightforward. I'll add a button that, when clicked, copies the translated text. Need to handle success and error cases with notifications.

Text-to-speech requires the Web Speech API. I'll create a function that uses speechSynthesis to speak the translated text. Also, check if the API is supported in the browser and handle cases where it's not.

Loading animation was already provided in the CSS, so I'll integrate that by adding a conditional rendering in the translate button. When isLoading is true, show a spinning loader next to the button text.

History storage can be managed with a state array that stores each translation. To persist it, use localStorage. When a new translation is made, add it to the history. Also, provide a way to clear the history, which updates the state and removes from localStorage.

Accessibility is important. For each new feature, ensure proper labels and ARIA attributes. For example, the language dropdown should have an associated label, and buttons should have aria-labels where necessary.

Error handling for each new feature: check if the API key is present for fetching languages, handle errors when copying to clipboard, and check browser support for speech synthesis.

Testing each feature: make sure the language dropdown changes the target language, the copy button works, speech plays the text, loading spinner appears during translation, and history entries are saved and displayed correctly.

Finally, update the CSS to style the new components: dropdown, buttons, history section, and notifications. Ensure responsive design for mobile views.

Putting it all together, the updated component will have the new state variables, useEffect hooks for initial data fetching, additional buttons and dropdown in the JSX, and corresponding event handlers. Also, update the CSS to accommodate new elements and ensure a consistent look.
