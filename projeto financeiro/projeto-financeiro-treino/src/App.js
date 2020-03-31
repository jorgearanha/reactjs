import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./global.css";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
