import React, { useState, useEffect } from "react";

function ExploreProfileList(props) {
  return (
    <div className="searchProfile">
      <div className="profileImage">
        <i className="fas fa-user-circle"></i>
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
          <i className="fas fa-laptop"></i> Programmer at KaKao
        </div>
        <div>
          <i className="fab fa-github"></i> github.com/re-collect
        </div>
      </div>
    </div>
  );
}

export default ExploreProfileList;
