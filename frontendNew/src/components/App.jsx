import React from 'react';
import Home from './Home';
import Login from './Login';
import {
   BrowserRouter as Router,
   Switch,
   Route,
 } from "react-router-dom";
import SignIn from './SignIn';


 
 function App(){

  

   return(
      <>
      <Router>
    <Switch>

          <Route exact path="/" >
          <Login/>
          </Route>
           
          <Route exact path="/home" >
          <Home />
          </Route>

          <Route exact path="/signIn" >
          <SignIn />
          </Route>
          
        </Switch>
        </Router>
      </>
   )
}

export default App;
