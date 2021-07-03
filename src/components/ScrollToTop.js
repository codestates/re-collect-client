import React, { useState, useEffect} from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  //window.addEventListener('scroll', toggleVisible);

  useEffect(() => {
      window.addEventListener('scroll', toggleVisible);

      return () => {
        window.removeEventListener('scroll', toggleVisible);
      };
  }, [visible])

  return(
    <button className="top-btn" 
      onClick={scrollToTop}
      style={{display: visible ? 'block' : 'none'}}
      >
      TOP
    </button>
  )
}

export default ScrollToTop;