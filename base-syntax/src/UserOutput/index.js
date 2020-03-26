import React from "react";

import "./styles.css";

const UserOutput = (props) => {
  return (
    <div>
      <p>{props.username}</p>
    </div>
  );
};

export default UserOutput;
