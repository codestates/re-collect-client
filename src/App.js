import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Explore from "./explore";
import Modal from "./components/Modal";
import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/collect" />
        <Route path="/profile" />
        <Route path="/explore" render={() => <Explore />} />
        <Route path="/login" render={() => <Modal />} />
        <Route exact path="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default withRouter(App);
