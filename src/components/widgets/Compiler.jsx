import React, { useEffect, useState } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const Compiler = () => {
  const [error, setError] = useState(null);
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [editName, setEditName] = useState(false);
  const [fileName, setFileName] = useState('index');

  const runCode = async () => {
    console.log(code, language, input);

    const options = {
        method: 'POST',
        url: 'https://onecompiler-apis.p.rapidapi.com/api/v1/run',
        headers: {
          'x-rapidapi-key': '1d1e7d6740msh21df59458325f61p13c288jsnfb5d1069b2eb',
          'x-rapidapi-host': 'onecompiler-apis.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          language: language,
          stdin: input,
          files: [
            {
              name: 'index.py',
              content: code
            }
          ]
        }
      };
      
      try {
          const response = await axios.request(options);
          setOutput(response.data.stdout);
      } catch (error) {
          console.error(error);
      }
  };

  const saveCode = async () => {

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;

    if(language === 'javascript'){
      link.download = fileName + '.js';
    } else if(language === 'python'){
      link.download = fileName + '.py'
    } else if(language === 'c'){
      link.download = fileName + '.c'
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c">C</option>
      </select>

      <div>
        {!editName ? 
           <div>
             <h2>{fileName}</h2>
             <button onClick={() => setEditName(true)}>Edit</button>           
           </div>

         : <div>
             <input value={fileName} onChange={(e) => setFileName(e.target.value)}/> 
             <button onClick={() => setEditName(false)}>Submit</button>
           </div>}      
      </div>
      

      <CodeMirror
        value={code}
        options={{
            mode: language,
            theme: "material",
            lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
            setCode(value);
        }}
        id="code-editor"
      />
      <textarea
        placeholder="Input (optional)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={runCode}>Run</button>
      <button onClick={saveCode}>Save</button>
      <pre id="code-preview">{output}</pre>

      </div>
    </div>
  );
};

export default Compiler;