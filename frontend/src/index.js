import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Nav/Navbar";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./index.css";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import About from "./components/about/about";
import Stores from "./components/stores/stores";
import Ngos from "./components/ngos/ngos";
import "bootstrap/dist/css/bootstrap.min.css";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Createorder from "./pages/Createorder";
import Terms from "./pages/Terms";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import logoImg from "./assets/images/logo.PNG";

const store = createStore(reducers, {});

const App = () => {
  const historyInstance = createBrowserHistory();

  return (
    <div className="App">
      <div className="">
        <Router history={historyInstance}>
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/stores" component={Stores} />
            <Route path="/ngos" component={Ngos} />
            <Route exact={true} path="/createorder" component={Createorder} />
            <Route exact={true} path="/checkout" component={Checkout} />
            <Route exact={true} path="/confirmation" component={Confirmation} />
            <Route exact={true} path="/terms" component={Terms} />
          </Switch>
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
