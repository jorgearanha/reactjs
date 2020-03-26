import React from "react";

import "./styles.css";

const UserInput = ({ username, changeUsername }) => {
  return (
    <input
      value={username}
      onChange={e => changeUsername(e.target.value)}
      placeholder="Username"
    />
  );
};

export default UserInput;
