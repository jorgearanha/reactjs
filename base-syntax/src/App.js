import React, { useState } from "react";

import UserOutput from "./UserOutput";
import UserInput from "./UserInput";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <UserInput changeUsername={setUsername} />
      <UserOutput username={username} />
    </div>
  );
}

export default App;
