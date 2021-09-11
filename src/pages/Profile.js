import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import FavoriteBookmark from '../components/FavoriteBookmark';
import {
	IsValidiateUsername,
	IsValidateCompany,
	IsValidateGitRepo,
} from '../util/validation';

import { getProfile } from '../redux/actions/getProfile';
import { editUsername } from '../redux/actions/editUsername';
import { editCompany} from '../redux/actions/editCompany';
import { editGitRepo} from '../redux/actions/editGitRepo';
import { setModalMode } from '../redux/actions/setModalMode';


function Profile() {
	const state = useSelector((state) => state.profileReducer);
	const { profile } = state;
	const dispatch = useDispatch();

	const [errorMessage, setErrMessage] = useState({
		username: '',
		company: '',
		gitrepo: '',
	});

	const [usernameInputReadMode, setUsernameInputReadMode] = useState(true);
	const [companyInputReadMode, setCompanyInputReadMode] = useState(true);
	const [gitRepoInputReadMode, setGitRepoInputReadMode] = useState(true);

	const userInputRef = useRef('');
	const companyInputRef = useRef('');
	const gitRepoInputRef = useRef('');

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);


	/*유저네임 변경*/
	const handleUsernameInput = (e) => {
		setUsernameInputReadMode(!usernameInputReadMode);
		userInputRef.current.readOnly = !userInputRef.current.readOnly;
		userInputRef.current.disabled = !userInputRef.current.disabled;

		if (e.currentTarget.getAttribute('name') === 'usernamecheck') {
			if (!IsValidiateUsername(userInputRef.current.value)) {
				setErrMessage({
					...errorMessage,
					username: '유저네임은 4~16글자, 영문 대소문자로 만들수 있습니다.',
				});
				return;
			}
			dispatch(editUsername(userInputRef.current.value));
			setErrMessage({ username: '', company: '', gitrepo: '' });
		}
	};

	/*회사 변경*/
	const handleCompanyInput = (e) => {
		setCompanyInputReadMode(!companyInputReadMode);
		companyInputRef.current.readOnly = !companyInputRef.current.readOnly;
		companyInputRef.current.disabled = !companyInputRef.current.disabled;

		if (e.currentTarget.getAttribute('name') === 'companycheck') {
			if (!IsValidateCompany(companyInputRef.current.value)) {
				setErrMessage({
					...errorMessage,
					company: '공백은 입력하실 수 없습니다.',
				});
				return;
			}
			dispatch(editCompany(companyInputRef.current.value));
			setErrMessage({ username: '', company: '', gitrepo: '' });
		}
	};

	/*깃레포 변경*/
	const handleGitRepoInput = (e) => {
		setGitRepoInputReadMode(!gitRepoInputReadMode);
		gitRepoInputRef.current.readOnly = !gitRepoInputRef.current.readOnly;
		gitRepoInputRef.current.disabled = !gitRepoInputRef.current.disabled;

		if (e.currentTarget.getAttribute('name') === 'gitrepocheck') {
			if (!IsValidateGitRepo(gitRepoInputRef.current.value)) {
				setErrMessage({
					...errorMessage,
					gitrepo: '공백은 입력하실 수 없습니다.',
				});
				return;
			}
			dispatch(editGitRepo(gitRepoInputRef.current.value));
			setErrMessage({ username: '', company: '', gitrepo: '' });
		}
	};

	return (
		<div className="profile-container">
			<div className="profile-container__inner profile-container__inner--left">
				<div className="profilebox">
					<div className="profilebox__photo">
						<FontAwesomeIcon icon={faUserCircle} className="photo-icon" />
					</div>
					<div className="profilebox__userinfo">
						<div className="usernamebox">
							<input
								type="text"
								name="username"
								placeholder={profile.username}
								readOnly
								disabled
								ref={userInputRef}
							/>
							<FontAwesomeIcon
								icon={usernameInputReadMode ? faPen : faCheck}
								className="edit-info"
								name={usernameInputReadMode ? 'usernamepen' : 'usernamecheck'}
								onClick={handleUsernameInput}
							/>
							<div className="errorMessage">{errorMessage.username}</div>
						</div>
						<p>{profile.email}</p>
						<p>Jonined Recollect on {profile.createdAt.slice(0, 10)}</p>
					</div>
					<div className="profilebox__follow">
						<p>
							{profile.recollectcount}
							<br />
              Recollects
						</p>
						<p>
              -<br />
              Following
						</p>
						<p>
              -<br />
              Followers
						</p>
					</div>
					<div className="profilebox__companyngitrepo">
						<div className="profilebox__companyngitrepo__inner">
							<FontAwesomeIcon icon={faLaptop} />
							<input
								type="text"
								name="company"
								readOnly
								disabled
								placeholder={
									profile.company
										? profile.company
										: 'Working at...'
								}
								ref={companyInputRef}
							/>
							<FontAwesomeIcon
								icon={companyInputReadMode ? faPen : faCheck}
								className="edit-info"
								name={companyInputReadMode ? 'companypen' : 'companycheck'}
								onClick={handleCompanyInput}
							/>
							<div className="errorMessage">{errorMessage.company}</div>
						</div>
						<div className="profilebox__companyngitrepo__inner">
							<FontAwesomeIcon icon={faGithub} />
							<input
								type="text"
								name="gitrepo"
								readOnly
								disabled
								placeholder={profile.gitrepo ? profile.gitrepo : '-'}
								ref={gitRepoInputRef}
							/>
							<FontAwesomeIcon
								icon={gitRepoInputReadMode ? faPen : faCheck}
								className="edit-info"
								name={gitRepoInputReadMode ? 'gitrepopen' : 'gitrepocheck'}
								onClick={handleGitRepoInput}
							/>
							<div className="errorMessage">{errorMessage.gitrepo}</div>
						</div>
					</div>
					<div className="profilebox__btns">
						<button
							onClick={() => {
								dispatch(setModalMode('editPwd'));
							}}
						>
              비밀번호 변경
						</button>
						<button
							onClick={() => {
								dispatch(setModalMode('delAccount'));
							}}
						>
              계정 삭제
						</button>
					</div>
				</div>
			</div>

			<div className="slicebox"></div>
			<div className="slicebox-row"></div>
			<div className="profile-container__inner profile-container__inner--right">
				<div className="popular-recollect">
					<h1>My Favorite Recollect</h1>
					<FavoriteBookmark favorite={profile.favorite} />
				</div>
			</div>
		</div>
	);
}

export default Profile;
