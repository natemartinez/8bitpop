import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";


const Programs = () => {
  const [error, setError] = useState(null);

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div>
        <h1>Editor</h1>
      </div>
    </div>
  );
};

export default Programs;