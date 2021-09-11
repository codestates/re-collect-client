import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../redux/actions/signInOut';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { setModalMode } from '../redux/actions/setModalMode'

function Nav() {
	const [isvisible, setVisible] = useState(false);
	const [isLogin, setIsLogin] = useState(true);

	const dispatch = useDispatch();
	const accessToken = localStorage.getItem('accessToken');

	const handleToggleBtn = () => {
		setVisible((isvisible) => !isvisible);
	};

	useEffect(() => {
		handleToggleBtn();
		return () => {
			handleToggleBtn();
		};
	}, [isvisible]);

	return (
		<div className='nav-container'>
			<Link
				to='/'
				onClick={() => {
					dispatch(setModalMode(''));
				}}
				className='nav-container__logo'>
				logo
			</Link>
			<FontAwesomeIcon
				icon={faBars}
				className='toggle-btn'
				onClick={handleToggleBtn}
			/>

			<div
				className={
					isvisible
						? 'nav-container__inner-container toggle'
						: 'nav-container__inner-container toggle on'
				}>
				<Link
					to='/'
					onClick={() => {
						dispatch(setModalMode(''));
						handleToggleBtn();
					}}>
					Home
				</Link>
				<Link
					to='/collect'
					onClick={() => {
						dispatch(setModalMode(''));
						handleToggleBtn();
					}}>
					Recollect
				</Link>
				<Link
					onClick={() => {
						setTimeout(() => dispatch(setModalMode('explore')), 2000);
						handleToggleBtn();
					}}
					to='/explore'>
					Explore
				</Link>
				{accessToken && isLogin ? (
					<>
						<Link to='/profile' onClick={handleToggleBtn}>
							Profile
						</Link>
						<Link
							to='/'
							onClick={() => {
								dispatch(logoutThunk());
								setIsLogin(false);
							}}>
							Logout
						</Link>
					</>
				) : (
					<div
						onClick={() => {
							dispatch(setModalMode('login'));
							handleToggleBtn();
							setIsLogin(true);
						}}>
						Login
					</div>
				)}
			</div>
		</div>
	);
}

export default withRouter(Nav);
