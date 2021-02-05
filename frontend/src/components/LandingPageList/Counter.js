import React, { useState } from "react";

function Counter({ setParentCounter }) {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(0);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setParentCounter((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
    setParentCounter((prevCount) => prevCount - 1);
  };
  return (
    <>
      <button
        onClick={handleDecrement}
        style={{
          backgroundColor: "#B2A8A4",
          border: "none",
          width: "25px",
        }}
      >
        -
      </button>
      <input
        style={{
          backgroundColor: "#fff",
          border: "none",
          textAlign: "center",
          width: "25px",
        }}
        readOnly
        value={count}
      />

      <button
        onClick={handleIncrement}
        style={{
          backgroundColor: "#FFBA08",
          border: "none",
          width: "25px",
          marginRight: "8px",
        }}
      >
        +
      </button>
    </>
  );
}

export default Counter;
