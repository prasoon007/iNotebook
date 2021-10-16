import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/context/notes/NoteState'
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null);
  const updateAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Switch>
            <Route exact path="/">
              <Home updateAlert={updateAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login updateAlert={updateAlert}/>
            </Route>
            <Route exact path="/signup">
              <Signup updateAlert={updateAlert}/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
