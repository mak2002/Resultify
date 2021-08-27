import './App.css';
import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
// import { BrowserRouter as Switch, Route, Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import AddResults from './components/AddResults'
import ShowMarks from './components/ShowMarks'
import AddStudentProfile from './components/AddStudentProfile'
import StudentsList from './components/StudentsList';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
          
          <Route exact path="/">
            <AddStudentProfile  />
          </Route>

          <Route path="/studentsList">
            <StudentsList />
          </Route>

          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
