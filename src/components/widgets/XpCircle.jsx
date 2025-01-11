import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const XpCircle = () => {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  };

  const handleDecrease = () => {
    setProgress((prev) => (prev > 0 ? prev - 10 : 0));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: "10px solid lightgray",
          backgroundColor: "#3498db",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>
          {progress}%
        </span>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            clipPath: "circle(50% at 50% 50%)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "10px solid yellow",
              clipPath: `inset(${100 - progress}% 0 0 0)`,
              transition: "clip-path 0.3s ease-in-out",
            }}
          ></div>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-primary me-2" onClick={handleIncrease}>
          Increase
        </button>
        <button className="btn btn-danger" onClick={handleDecrease}>
          Decrease
        </button>
      </div>
    </div>
  );
};

export default XpCircle
