import './App.css';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './page/Landing';
import ScrollToTop from './components/ScrollToTop';
import Collect from './page/Collect';
import Explore from './page/Explore';
import Profile from './page/Profile';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FindPwdModal from './components/FindPwdModal';
import SuccessSignUpModal from './components/SuccessSignUpModal';
import ExploreModal from './components/ExploreModal';
import ChangePwdModal from './components/ChangePwdModal';
import DelAccountModal from './components/DelAccountModal';
import SetNewPwdModal from './components/SetNewPwdModal';
import Loading from './components/Loading';
import SetNewPwd from './page/SetNewPwd';
import SuccessSetNewPwd from './components/SuccessSetNewPwd';
import NofiticationCenter from './components/NotificationCenter';
import Error from './components/Error';
import SentEmailModal from './components/SentEmailModal';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom';

function App() {
  const [modalMode, setModalMode] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  // 모달창 on인상태, 스크롤 불가 //
  useEffect(() => {
    const body = document.querySelector('body');
    if (modalMode !== '') {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'scroll';
    }
  });

  return (
    <Router>
      {/* mode 상태값에 따른 모달창*/}
      {modalMode === 'login' && (
        <LoginModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'signup' && (
        <SignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'findPwd' && (
        <FindPwdModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'sentEmail' && (
        <SentEmailModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'successSignup' && (
        <SuccessSignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'explore' && (
        <ExploreModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'changePwd' && (
        <ChangePwdModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'delAccount' && (
        <DelAccountModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'setNewPwd' && (
        <SetNewPwdModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'successSetNewPwd' && (
        <SuccessSetNewPwd modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'changePwd' && (
        <ChangePwdModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === 'delAccount' && (
        <DelAccountModal modalMode={modalMode} setModalMode={setModalMode} />
      )}

      <Nav modalMode={modalMode} setModalMode={setModalMode} />
      <NofiticationCenter />
      <Switch>
        <Route path="/loading" component={Loading}></Route>
        <Route path="/loading" component={Loading}></Route>
        <Route path="/collect" component={Collect}></Route>
        <Route path="/login/pwd/reset">
          <SetNewPwd modalMode={modalMode} setModalMode={setModalMode} />
        </Route>
        <Route path="/profile">
          {accessToken ? (
            <Profile modalMode={modalMode} setModalMode={setModalMode} />
          ) : (
            <Redirect to="*" />
          )}
        </Route>
        <Route path="/explore" component={Explore}>
          <Explore modalMode={modalMode} setModalMode={setModalMode} />
        </Route>
        <Route exact path="/" component={Landing}></Route>
        <Route path="*" component={Error}></Route>
      </Switch>
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default withRouter(App);
