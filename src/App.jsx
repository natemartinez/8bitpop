import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './components/Main';
import Menu from './components/Menu';
import NewUser from './components/NewUser';
import Login from './components/Login';
import Trending from './components/articles/Trending';
import Featured from './components/articles/Featured';
import PhaserIntro from './components/devtips/PhaserIntro';
import WorldBuilding from './components/devtips/WorldBuilding';
import Characters from './components/devtips/Characters';

import Build from './components/pages/Build';
import Community from './components/pages/Community';
import Profile from './components/pages/Profile';

import ArticleLayout from './components/articles/ArticleLayout';
import TopTen from './components/articles/TopTen';

function App() {
  return (
     <Routes>
      <Route index element={<Main/>} />
      
      <Route path="/login" element={<Login/>} />
      <Route path="/new-user" element={<NewUser/>} />

      <Route path='/articles' element={<ArticleLayout />}>
       <Route path="trending" element={<Trending />} />
       <Route path="featured" element={<Featured />} />  
       <Route path="topten" element={<TopTen />} />  
            
      </Route>


      <Route path="/devtips/phaser-intro" element={<PhaserIntro/>} />
      <Route path="/devtips/world-building" element={<WorldBuilding/>} />
      <Route path="/devtips/characters" element={<Characters/>} />
      <Route path="/pages/build" element={<Build/>} />
      <Route path="/pages/community" element={<Community/>} />
      <Route path="/pages/profile" element={<Profile/>} />
     </Routes>
  );
}

export default App;
