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
import Register from "./components/register/register";
import "bootstrap/dist/css/bootstrap.min.css";
import StripeCheckout from "./pages/StripeCheckout";
import Createorder from "./pages/Createorder";
import Terms from "./pages/Terms";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { createBrowserHistory } from "history";
import "./assets/css/normilize.css";
import "./assets/css/skeleton.css";
import "./assets/css/prog-tracker.css";

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
            {/* <Route path="/:search" component={Home} /> */}
            <Route path="/about" component={About} />
            <Route path="/stores" component={Stores} />
            <Route path="/ngos" component={Ngos} />
            <Route path="/register" component={Register} />
            {/* <Route path="/happicard/payment" component={StripeCheckout} /> */}
            <Route exact={true} path="/createorder" component={Createorder} />
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
