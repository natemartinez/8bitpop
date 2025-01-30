import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import Compiler from "../widgets/Compiler";

const Programs = () => {
  const [error, setError] = useState(null);

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div>
        <h1>Editor</h1>
      </div>
      <div className='d-flex container justify-content-center'>
        <Compiler />
      </div>
    </div>
  );
};

export default Programs;