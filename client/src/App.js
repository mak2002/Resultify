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
import { ThemeProvider, Paper } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"

function App() {

  const theme = createTheme({
    palette: {
      type: 'dark',
    }
  })

  return (
    <div className="App">
      <Router>
          <ThemeProvider theme={theme}>
          <CssBaseline />
        <Layout>
          <Switch>
          

            <Route exact path="/">
              <Paper>
                <AddStudentProfile  />
              </Paper>
            </Route>

            <Route path="/studentsList">
              <Paper>
              <StudentsList />
              </Paper>
            </Route>

            <Route path="/addResults">
              <Paper>
                <AddResults />
              </Paper>
            </Route>

            <Route path="/seeMarks">
              <Paper>
                <ShowMarks />
              </Paper>
            </Route>


          </Switch>
        </Layout>
          </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
