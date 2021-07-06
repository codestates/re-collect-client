<<<<<<< HEAD
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
import Loading from './components/Loading';
import Error from './components/Error';
=======
import "./App.css";
import React, { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Landing from "./page/Landing";
import ScrollToTop from "./components/ScrollToTop";
import Collect from "./page/Collect";
import Explore from "./page/Explore";
import Profile from "./page/Profile";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import FindPwdModal from "./components/FindPwdModal";
import SuccessSignUpModal from "./components/SuccessSignUpModal";
import ExploreModal from "./components/ExploreModal";
import Carousel from "./components/TestCarousel";
>>>>>>> d31d6600f444427019821c737074f63eca83fd90
import {
  Link,
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  withRouter,
} from "react-router-dom";

function App() {
  const [modalMode, setModalMode] = useState("");

  return (
    <Router>
      {/* mode 상태값에 따른 모달창*/}
      {modalMode === "login" && (
        <LoginModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === "signup" && (
        <SignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === "findPwd" && (
        <FindPwdModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === "successSignup" && (
        <SuccessSignUpModal modalMode={modalMode} setModalMode={setModalMode} />
      )}
      {modalMode === "explore" && (
        <ExploreModal modalMode={modalMode} setModalMode={setModalMode} />
      )}

      <Nav modalMode={modalMode} setModalMode={setModalMode} />
      <Switch>
        <Route path="/error" component={Error}></Route>
        <Route path="/loading" component={Loading}></Route>
        <Route path="/collect" component={Collect}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/explore" component={Explore}></Route>
        <Route path="/test" component={Carousel}></Route>
        <Route exact path="/" component={Landing}></Route>
      </Switch>
      <ScrollToTop />
      <Footer />
    </Router>
  );
}

export default withRouter(App);
