import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Nav() {
  const [isvisible, setVisible] = useState(false);

  const handleToggleBtn = () => {
      setVisible(isvisible => !isvisible);
  };

  //isLogin true 인 경우 Login 메뉴 Profile 로 전환 필요//
  //로그인 클릭시 로그인 팝업 노출, post/login, validation check//
  

  useEffect(() => {
    handleToggleBtn();
      return () => {
      handleToggleBtn();
      };
  }, [isvisible])

  return (
    <div className="nav-container">
      <Link to="/" className="nav-container__logo">logo</Link>
      <FontAwesomeIcon icon={faBars} className="toggle-btn" onClick={handleToggleBtn}/>

      <div className={isvisible? 
        "nav-container__inner-container toggle" 
        : "nav-container__inner-container toggle on"}>

        <Link to="/">Home</Link>
        <Link to="/collect">Recollect</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/profile">Login</Link>
      </div>
      
    </div>
  );
}

export default withRouter(Nav);
