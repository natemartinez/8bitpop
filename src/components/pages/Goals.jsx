import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const Goals = () => {
  const [error, setError] = useState(null);



  return (
    <div className="profile">
      {error && <p>{error}</p>}
      <div>
        <h2>This is the profile page</h2>
      </div>
    </div>
  );
};

export default Goals;