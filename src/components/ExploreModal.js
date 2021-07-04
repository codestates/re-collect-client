import React, { useEffect } from "react";
import {
  IsValidateEmail,
  IsValidiateUsername,
  IsValidiatePassword,
} from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ExploreModal(props) {
  const isValid = () => {
    const emailForSubscribe = document.querySelector(".emailForSubscribe")
      .value;
    if (!IsValidateEmail(emailForSubscribe)) {
      const error = document.querySelector(".exploreErrorMessage");
      error.style.display = "flex";
    } else {
      const error = document.querySelector(".exploreErrorMessage");
      error.style.display = "none";
      props.setModalMode("");
    }
  };
  return (
    <div className="modalWrapper">
      <div className="exploreModalWrapper">
        <div
          className="closeBtn"
          onClick={() => {
            props.setModalMode("");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="contents">
          <p>
            아직 준비중인 서비스 입니다 <br /> 기대해주세요!
          </p>
          <input className="emailForSubscribe" placeholder="Email" />
          <button onClick={isValid}>업데이트 소식받기</button>
          <div className="exploreErrorMessage"> 이메일을 확인해주세요 </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreModal;
