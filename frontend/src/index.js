import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Nav/Navbar";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import About from "./components/about/about";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Terms from "./pages/Terms";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducers, {});

const App = () => {
  return (
    <div className="App">
      <div className="">
        <Router>
          <div className="row">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route exact={true} path="/checkout" component={Checkout} />
              <Route
                exact={true}
                path="/confirmation"
                component={Confirmation}
              />
              <Route exact={true} path="/terms" component={Terms} />
            </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
