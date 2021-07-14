import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../modules/sign';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Nav(props) {
  const [isvisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleToggleBtn = () => {
    setVisible((isvisible) => !isvisible);
  };

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    handleToggleBtn();
    return () => {
      handleToggleBtn();
    };
  }, [isvisible]);

  return (
    <div className="nav-container">
      <Link
        to="/"
        onClick={() => {
          props.setModalMode('');
        }}
        className="nav-container__logo"
      >
        logo
      </Link>
      <FontAwesomeIcon
        icon={faBars}
        className="toggle-btn"
        onClick={handleToggleBtn}
      />

      <div
        className={
          isvisible
            ? 'nav-container__inner-container toggle'
            : 'nav-container__inner-container toggle on'
        }
      >
        <Link
          to="/"
          onClick={() => {
            props.setModalMode('');
            handleToggleBtn();
          }}
        >
          Home
        </Link>
        <Link
          to="/collect"
          onClick={() => {
            props.setModalMode('');
            handleToggleBtn();
          }}
        >
          Recollect
        </Link>
        <Link
          onClick={() => {
            props.setModalMode('explore');
            handleToggleBtn();
          }}
          to="/explore"
        >
          Explore
        </Link>
        {accessToken ? (
          <>
            <Link to="/profile"
            onClick={handleToggleBtn}>
              Profile
            </Link>
            <div
              onClick={() => {
                dispatch(logoutThunk());
              }}
            >
              Logout
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              props.setModalMode('login');
              handleToggleBtn();
            }}
            
          >
            Login
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Nav);
