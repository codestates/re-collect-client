import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    console.log(`${scrolled} = scrollTop`);
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //window.addEventListener('scroll', toggleVisible);

  useEffect(() => {
    let timer;
    window.addEventListener("scroll", function () {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          toggleVisible();
        }, 3000);
      }
    });

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [visible]);

  return (
    <button
      className="top-btn"
      onClick={scrollToTop}
      style={{ display: visible ? "block" : "none" }}
    >
      TOP
    </button>
  );
}
// window.removeEventListener('scroll', function(){
//   if(!timer){
//     timer = setTimeout(() => {
//       timer = null;
//       toggleVisible();
//     }, 3000 );
//   }
// });

export default ScrollToTop;
