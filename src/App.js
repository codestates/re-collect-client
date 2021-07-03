
import React from 'react';
import Collect from './page/Collect';
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
    <Route path="/collect" render={() => <Collect />} />
      <Route path="/profile"></Route>
      <Route path="/explore"></Route>
      <Route exact path="/" component={Landing}></Route>
    </Switch>
    <ScrollToTop />
    <Footer />
    </Router>
    
  )

}

export default withRouter(App);
