import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import { ChatProvider } from "./context/chatContext.jsx"; // Import chatContext
import ThemeProvider from "./context/ThemeContext.jsx";
createRoot(document.getElementById("root")).render(
  <ThemeProvider> 
    <ChatProvider>
      <BrowserRouter>
        {" "}
        {/* Wrap your App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </ChatProvider>
    </ThemeProvider> 

);
