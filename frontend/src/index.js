import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Nav/Navbar";
import {  BrowserRouter  as Router, Switch,Link, Route } from 'react-router-dom';
import "./index.css";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import About from "./components/about/about";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
 
  return (
    <div className="App">
      <div className="container">
      <Router>
            <div className="row">
            <Navbar />           
              <Switch>
                <Route exact path="/" component={Home} />                            
                <Route path="/about" component={About}/>
              </Switch>              
            </div>
          </Router>
        <Footer />
      </div>

    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));