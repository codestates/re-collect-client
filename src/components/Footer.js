import React from "react";

function Footer() {

  // const ShareUrl = () => {
  //   const url = window.document.location.href;
  //   console.log(url,' what is url');

  // }
  

  return (
    <div className="footer">
      <div className="footer__inner">
        <span className="copyright">Recollect.2021</span>
        
        <a href="https://github.com/zuzokim" title="@github" target="_blank" rel="noopener noreferrer">Jiwoo Kim</a>
        <a href="https://github.com/siyooonkim" title="@github" target="_blank" rel="noopener noreferrer">Siyoon Kim</a>
        <a href="https://github.com/Justicexx0099" title="@github" target="_blank" rel="noopener noreferrer">Yubin Park</a>
        <a href="https://github.com/CodingGorani" title="@github" target="_blank" rel="noopener noreferrer">Seokjun Lee</a>
        <a href="https://github.com/codestates/re-collect-client" title="Check Recollect Repository&Wiki" target="_blank" rel="noopener noreferrer">Repo&Wiki</a>

        <a href="mailto:recollect.today.service@gmail.com" title="Send Feedback">Feedback</a>
        {/* <a href="">Share</a>
        <span onClick={ShareUrl}>share</span> */}
      </div>

    </div>
  )
}

export default Footer;
