import React, { useState, useEffect } from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__inner">
        <span className="copyright">Recollect.2021</span>
        
        <a href="https://github.com/zuzokim" title="@github" target="_blank">Jiwoo Kim</a>
        <a href="https://github.com/siyooonkim" title="@github" target="_blank">Siyoon Kim</a>
        <a href="https://github.com/Justicexx0099" title="@github" target="_blank">Yubin Park</a>
        <a href="https://github.com/CodingGorani" title="@github" target="_blank">Seokjun Lee</a>
        <a href="https://github.com/codestates/re-collect-client" title="Check Recollect Repository&Wiki" target="_blank">Repo&Wiki</a>
        {/* <span className="about">About Us</span> */}
        <a href="mailto:recollector@gmail.com" title="Send Feedback">Feedback</a>
        <a href="">Share</a>
      </div>

    </div>
  )
}

export default Footer;
