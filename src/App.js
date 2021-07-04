import './App.css';
import React, { useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './page/Landing';
import ScrollToTop from './components/ScrollToTop';
import Collect from './page/Collect';
import Explore from './page/Explore';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FindPwdModal from './components/FindPwdModal';
import SuccessSignUpModal from './components/SuccessSignUpModal';
import ExploreModal from './components/ExploreModal';
import {
  Link,
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Profile from './page/Profile';

function App() {
  const [modalMode, setModalMode] = useState('');

  return (
    <Router>
      {/* mode 상태값에 따른 모달창*/}
      {modalMode === 'login' ? (
        <LoginModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : (
        <></>
      )}
      {modalMode === 'signup' ? (
        <SignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : (
        <></>
      )}
      {modalMode === 'findPwd' ? (
        <FindPwdModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : (
        <></>
      )}
      {modalMode === 'successSignup' ? (
        <SuccessSignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : (
        <></>
      )}
      {modalMode === 'explore' ? (
        <ExploreModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : (
        <></>
      )}

      <Nav modalMode={modalMode} setModalMode={setModalMode} />
      <Switch>
        <Route path="/collect" component={Collect}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/explore" component={Explore}></Route>
        <Route exact path="/" component={Landing}></Route>
      </Switch>
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default withRouter(App);
