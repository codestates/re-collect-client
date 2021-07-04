import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";

function Nav(props) {
  const [isvisible, setVisible] = useState(false);

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
    <div className="nav-container">
      <Link to="/" className="nav-container__logo">
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
            ? "nav-container__inner-container toggle"
            : "nav-container__inner-container toggle on"
        }
      >
        <Link to="/">Home</Link>
        <Link to="/collect">Recollect</Link>
        <Link
          onClick={() => {
            props.setModalMode("explore");
          }}
          to="/explore"
        >
          Explore
        </Link>
        <div
          onClick={() => {
            props.setModalMode("login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default withRouter(Nav);
