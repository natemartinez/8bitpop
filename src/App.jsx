import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import NewUser from './components/NewUser';
import Login from './components/Login';
import Trending from './components/articles/Trending';


function App() {
  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/new-user" element={<NewUser/>} />
      <Route path="/articles/trending" element={<Trending />} />
    </Routes>
    
  );
}

export default App;
