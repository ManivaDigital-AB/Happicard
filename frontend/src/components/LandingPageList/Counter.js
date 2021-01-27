import React, { useState } from "react";

function Counter() {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(0);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };
  return (
    <>
      <button onClick={handleDecrement}>-</button>
      <span style={{ marginLeft: "2px", marginRight: "2px" }}>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </>
  );
}

export default Counter;
