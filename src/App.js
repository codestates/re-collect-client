import './App.css';
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
}

export default withRouter(App);
