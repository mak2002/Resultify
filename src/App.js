import './App.css';
import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainPage />
    </div>
  );
}

export default App;
