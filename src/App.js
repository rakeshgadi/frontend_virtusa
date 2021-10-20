
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" render={() => {
          return (
            
            <Redirect to="/login" />
          )
        }} ></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/signup" component={Register}></Route>

        {/*<Route exact path='/home' component={()=><navbar authorized={true}/>}></Route>*/}
      </div>
    </Router>
  );
}

export default App;
