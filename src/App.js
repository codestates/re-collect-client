import './App.scss'
import { useEffect } from 'react';
import Landing from './pages/Landing';
import SetNewPwd from './pages/SetNewPwd';
import Collect from './pages/Collect';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import Error from './components/Error';
import NofiticationCenter from './components/NotificationCenter';
import LoginModal from './components/Modal/LoginModal';
import SignUpModal from './components/Modal/SignUpModal';
import FindPwdModal from './components/Modal/FindPwdModal';
import SuccessSignUpModal from './components/Modal/SuccessSignUpModal';
import ExploreModal from './components/Modal/ExploreModal';
import EditPwdModal from './components/Modal/EditPwdModal';
import DelAccountModal from './components/Modal/DelAccountModal';
import SetNewPwdModal from './components/Modal/SetNewPwdModal';
import SuccessSetNewPwd from './components/SuccessSetNewPwd';
import SentEmailModal from './components/Modal/SentEmailModal';

import {
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router,
	withRouter,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
	const { modalMode } = useSelector((state)=>state.setModalModeReducer)
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
			{modalMode === 'login' && <LoginModal />}
			{modalMode === 'signup' && <SignUpModal/>}
			{modalMode === 'findPwd' && <FindPwdModal/>}
			{modalMode === 'sentEmail' && <SentEmailModal/>}
			{modalMode === 'successSignup' && <SuccessSignUpModal />}
			{modalMode === 'explore' && <ExploreModal />}
			{modalMode === 'delAccount' && <DelAccountModal/>}
			{modalMode === 'setNewPwd' && <SetNewPwdModal />}
			{modalMode === 'successSetNewPwd' && <SuccessSetNewPwd />}
			{modalMode === 'editPwd' && <EditPwdModal/>}

			<Nav/>
			<NofiticationCenter />
			<Switch>
				<Route path="/loading" component={Loading}></Route>
				<Route path="/collect" component={Collect}></Route>
				<Route path="/auth/pwd">
					<SetNewPwd />
				</Route>
				<Route path="/profile">
					{accessToken ? (
						<Profile />
					) : (
						<Redirect to="*" />
					)}
				</Route>
				<Route path="/explore" component={Explore}>
					<Explore />
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
