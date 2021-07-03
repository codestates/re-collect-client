import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLaptop,  } from '@fortawesome/free-solid-svg-icons';
import { faGithub  } from '@fortawesome/free-brands-svg-icons';

function ExploreProfileList(props) {
  return (
    <div className="searchProfile">
      <div className="profileImage">
      <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <p> 정리벽 개발자 </p>
      <div className="socialInfo">
        <div>
          <div> 28 </div>
          <div> Recollects </div>
        </div>
        <div>
          <div> 214 </div>
          <div> Following </div>
        </div>
        <div>
          <div> 280 </div>
          <div> Followers </div>
        </div>
      </div>
      <div className="companyInfo">
        <div>
          <FontAwesomeIcon icon={faLaptop} /> Programmer at KaKao
        </div>
        <div>
        <FontAwesomeIcon icon={faGithub} /> github.com/re-collect
        </div>
      </div>
    </div>
  );
}

export default ExploreProfileList;
