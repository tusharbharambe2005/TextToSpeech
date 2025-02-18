import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import "./App.css"; // Import global styles

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
