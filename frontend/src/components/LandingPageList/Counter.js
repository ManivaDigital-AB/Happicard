import React, { useState, useEffect} from "react";

function Counter({ setParentCounter, initialCount }) {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(initialCount);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setParentCounter((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1 < 0 ? 0 : prevCount - 1);
    setParentCounter((prevCount) => prevCount - 1 < 0 ? 0 : prevCount - 1);
  };

  return (
    <>
      <button
        onClick={handleDecrement}
        style={{
          backgroundColor: "#B2A8A4",
          border: "none",
          width: "40px",
          height: "34px",
          color: "#FFF",
          borderRadius: "2px"
        }}
      >
        -
      </button>
      <input
        style={{
          backgroundColor: "#fff",
          border: "none",
          textAlign: "center",
          width: "40px",
          height: "34px",
        }}
        readOnly
        value={count}
      />

      <button
        onClick={handleIncrement}
        style={{
          backgroundColor: "#118678",
          border: "none",
          width: "40px",
          height: "34px",
          marginRight: "8px",
          color: "#FFF",
          borderRadius: "2px"
        }}
      >
        +
      </button>
    </>
  );
}

export default Counter;
