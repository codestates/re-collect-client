import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { userInfoLists } from "./Explore_temp";

function ExploreProfileList({ className, ...props }, settings) {
  return (
    // landing page react-reveal 'Pulse cascade'적용을 위한 props 전달 {...props}//
    <div
      className={`${className}__searchProfile`}
      {...props}
      {...settings}
      key={props.key}
    >
      <div className={`${className}__searchProfile__profileImage`}>
        <FontAwesomeIcon icon={faUserCircle} />
      </div>

      {/* <p> {props.user.username} </p> */}

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
          <FontAwesomeIcon className="icon" icon={faLaptop} />
          {/* {props.user.company ? `Work at ${props.user.company}` : '-'} */}
        </div>
        <div>
          <FontAwesomeIcon className="icon" icon={faGithub} />
          {/* {props.user.gitRepo ? `${props.user.gitRepo}` : '-'} */}
        </div>
      </div>
    </div>
  );
}

export default ExploreProfileList;
