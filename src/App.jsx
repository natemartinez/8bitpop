import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import NewUser from './components/NewUser';
import Login from './components/Login';
import Trending from './components/articles/Trending';
import PhaserIntro from './components/devtips/PhaserIntro';


function App() {
  return (
    <Routes>
      <Route index element={<Main/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/new-user" element={<NewUser/>} />
      <Route path="/articles/trending" element={<Trending/>} />
      <Route path="/devtips/phaser-intro" element={<PhaserIntro/>} />
    </Routes>
    
  );
}

export default App;
