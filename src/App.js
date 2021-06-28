import './App.css';
import { Nav, Footer } from './components';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';

function App() {
  return;
  <Router>
    <Nav />
    <Switch>
      <Route path="/collect" />
      <Route path="/profile" />
      <Route path="/explore" />
      <Route exact path="/" />
    </Switch>
    <Footer />
  </Router>;
}

export default withRouter(App);
