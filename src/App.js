import './App.css';
<<<<<<< HEAD
// import { Nav, Footer } from './components';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Collect from './page/Collect';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/collect" render={() => <Collect />} />
        <Route path="/profile" />
        <Route path="/explore" />
        <Route exact path="/" />
      </Switch>
      <Footer />
    </Router>
  );
=======
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './page/Landing';
import ScrollToTop from "./components/ScrollToTop";
import { Link, Switch, Route, BrowserRouter as Router, Redirect, withRouter } from 'react-router-dom';

function App() {
  return(
    <Router>
    <Nav />
    <Switch>
      <Route path="/collect"></Route>
      <Route path="/profile"></Route>
      <Route path="/explore"></Route>
      <Route exact path="/" component={Landing}></Route>
    </Switch>
    <ScrollToTop />
    <Footer />
    </Router>
    
  )

>>>>>>> fdb03d0465d30362122e7f3a0eb237a8498786e8
}

export default withRouter(App);
