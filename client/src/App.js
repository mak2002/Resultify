import './App.css';
import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import AddResults from './components/AddResults'
import ShowMarks from './components/ShowMarks'
import AddStudentProfile from './components/AddStudentProfile'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>

              <Route>
                <AddStudentProfile exact path = "/" />
              </Route>


              <Route  path = '/'>
                <AddResults />
              </Route>
              

              <Route path = '/seeMarks'>
                <ShowMarks />
              </Route>

              

              <MainPage />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
