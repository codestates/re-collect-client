import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Landing from "./page/Landing";
import ScrollToTop from "./components/ScrollToTop";
import Collect from "./page/Collect";
import Explore from "./page/Explore";
import {
  Link,
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/collect" component={Collect}></Route>
        <Route path="/profile"></Route>
        <Route path="/explore" component={Explore}></Route>
        <Route exact path="/" component={Landing}></Route>
      </Switch>
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default withRouter(App);
