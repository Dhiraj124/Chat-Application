import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { isLoggedInUser } from './actions';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './container/HomePage';
import LoginPage from './container/Loginpage';
import RegisterPage from './container/RegisterPage';


function App() {

  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  },[])

  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" component={HomePage} exact/>
        <Route path="/login" component={LoginPage} exact/>
        <Route path="/signup" component={RegisterPage} exact/>
      </Router>
    </div>
  );
}

export default App;
