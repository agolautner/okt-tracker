import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Callback from './pages/Callback'
import Protected from './components/Protected';
import Register from './pages/Register';
import Hikes from './pages/Hikes';
import Stamps from './pages/Stamps';

function App() {
  return (
      <div className="App">
        <Navigation />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/stamps' element={<Stamps/>}/>
          <Route path='/hikes' element={<Hikes/>}/>
          <Route path='/profile' element={(
            <Protected key={1}>
              <Profile/>
            </Protected>
          )}/>
          <Route path='/callback/:provider' element={<Callback/>}/>
          <Route path='/register' element={(
            <Protected key={2}>
              <Register/>
            </Protected>
          )}/>
        </Routes>
      </div>
  );
}

export default App;
