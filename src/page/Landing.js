import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Flip, Fade, Zoom, Bounce } from "react-reveal";
import Pulse from "react-reveal/Pulse";
import Jello from "react-reveal/Jello";

function Landing() {

  ///새로고침시 최상단이동//
  useEffect(() => {
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="landing">
        <div className="landing__inner">
          <div className="landing__inner--first">
            <div className="first-wrap">
              <div className="introtext">
                <Flip bottom cascade>
                  <h1>Recollect</h1>
                </Flip>

                <p>Re+collect 기억해내다+모아서 다시보다</p>
                {/* <p>
                  똑똑한 북마크 관리툴
                </p> */}
                <Bounce>
                  <Link to={`./collect`}>
                    <button>Recollect 시작하기</button>
                  </Link>
                </Bounce>
              </div>

              <Fade duration={3000}>
                {/* <div className="introgif"> */}
                <img src="introgifsample.png" alt="introgif" />
                {/* </div> */}
              </Fade>

              <div className="mobile-introtext">
                {/* <p className="mobile-p">
                  Re+collect 
                  기억해내다+모아서 다시보다
                </p> */}
                <Bounce>
                  <Link to={`./collect`}>
                    <button className="mobile-btn">Recollect 시작하기</button>
                  </Link>
                </Bounce>
              </div>
            </div>
          </div>

          <Fade left duration={2500}>
            <div className="sectionslice">
              <div className="triangle"></div>
            </div>
          </Fade>

          <div className="landing__inner--second">
            <div className="desc-wrap desc-wrap--1">
              <Zoom duration={2300}>
                <img clasName="desc1-img" src="desc01.png" alt="desc1" />

                <p className="desc1">
                  자주 들어가는 웹사이트
                  <br />
                  점점 늘어나는 브라우저 탭
                </p>
              </Zoom>
            </div>
            <div className="desc-wrap desc-wrap--2">
              <Zoom delay={500}>
                <p className="desc2">
                  크롬 사파리 카카오톡 메모장
                  <br />
                  여기저기 흩어져있는 북마크들...
                </p>
                <img clasName="desc2-img" src="desc002.png" alt="desc2" />
              </Zoom>
            </div>
            <div className="desc-wrap desc-wrap--3">
              <img clasName="desc3-img" src="desc03.png" alt="desc3" />
              <Zoom>
                <p className="desc3">
                  저장만 해두고
                  <br />
                  다시 찾지 않은 북마크들...
                </p>
              </Zoom>
            </div>
          </div>

          <Fade right duration={2500}>
            <div className="sectionslice slicered">
              <div className="triangle-right"></div>
            </div>
          </Fade>

          <div className="landing__inner--third">
            <Zoom delay={1000}>
              <h1>
                {/* 저장만 해두고 잊혀졌거나, 다시 찾기 힘든 북마크들 
                <br /> */}
                이젠 북마크를 찾아 헤매거나 놓치지 말고
                <br />
                똑똑하게 관리해요!
              </h1>
            </Zoom>

            <div className="desc">
              <div className="desc__inner">
                <Zoom duration={2000}>
                  <img src="collectgifsample.png" alt="collect-gif" />
                </Zoom>
                <div className="desc-text">
                  <Fade duration={2000}>
                    <h2>
                      나만의 설명을 붙여
                      <br />
                      소중한 북마크를 간직하세요
                    </h2>
                    <p>
                      카테고리,색상,중요도를 자유롭게 설정할 수 있어요.
                      <br />
                    </p>
                    <Link to="/collect" className="start-tag">
                      &gt; 북마크 추가하기
                    </Link>
                  </Fade>
                </div>
              </div>
            </div>
            <div className="desc-dragdrop">
              <Fade>
                <span className="drag-top-desc">
                  필요한 북마크는
                  <br />\ 키워드 검색으로 쉽게 찾을 수 있어요 /
                </span>
              </Fade>

              <Pulse>
                <img src="dragsample.png" alt="drag-drop-gif" />
              </Pulse>

              <div className="desc-dragdrop__desc">
                <Fade left>
                  <p className="desc1">
                    비슷한 주제의 북마크는 콜렉션으로 만들고
                  </p>
                </Fade>
                <Fade right>
                  <p className="desc2">드래그&드롭으로 쉽고 빠르게 정리해요!</p>
                </Fade>
              </div>
            </div>
          </div>
          <Fade left duration={2500}>
            <div className="sectionslice slicegreen">
              <div className="triangle"></div>
            </div>
          </Fade>

          <div className="landing__inner--fourth">
            <div className="alarm-wrapper">
              <Jello delay={1000}>
                <div className="alarm">
                  9 Unread bookmarks, Start to Recollect !
                </div>
              </Jello>
            </div>
            <div className="alarm-desc-wrapper">
              <div className="alarm-desc">
                <div className="alarm-desc__inner">
                  <Fade duration={3000}>
                    <h2>
                      저장만 해두고 읽지 않은 북마크
                      <br />
                      Recollect가 알려드려요!
                    </h2>
                    <p>잊고있던 북마크는 알림을 통해 다시 모아볼 수 있어요.</p>
                    <Link to="./collect"> &gt; 북마크 모아보기</Link>
                  </Fade>
                </div>
              </div>
              <Fade duration={2000}>
                <div className="alarm-img">
                  <img src="./mockup.png" alt="alarm-img" />
                </div>
              </Fade>
            </div>
          </div>
          <Fade right duration={2500}>
            <div className="sectionslice sliceblue">
              <div className="triangle-right"></div>
            </div>
          </Fade>

          <div className="landing__inner--fifth">
            <Pulse left cascade delay={1000}>
              <div className="profile-wrapper">
                <div className="profile"></div>
                <div className="profile"></div>
                <div className="profile"></div>
                <div className="profile"></div>
              </div>
            </Pulse>

            <div className="collection-desc">
              <Fade duration={3000}>
                <p>
                  다른 유저의 콜렉션을 탐험하고
                  <br />
                  취향에 맞는 북마크도 찾아보세요!
                </p>
                <Link to="/explore"> &gt; 콜렉션 탐험하기</Link>
              </Fade>
            </div>
          </div>
          <Fade left duration={2500}>
            <div className="sectionslice slicered-left">
              <div className="triangle"></div>
            </div>
          </Fade>

          <div className="landing__inner--sixth">
            <Pulse>
              <div className="try-wrapper">
                이 모든 기능을 지금 바로 사용해 보세요!
              </div>
            </Pulse>
            <Fade top>
              <div className="values-wrapper">
                <div className="values-wrapper__up">
                  <div className="values-up">북마크 추가하기</div>
                  <div className="values-up">카테고리 지정하기</div>
                  <div className="values-up">색상 정하기</div>
                  <div className="values-up">중요 표시하기</div>
                </div>
                <Fade top cascade>
                  <div className="values-wrapper__down">
                    <div className="values--down">
                      드래그&드롭 북마크 정리하기
                    </div>
                    <div className="values--down">
                      읽지 않은 북마크 Recollect
                    </div>
                    <div className="values--down">
                      다른 유저들의 콜렉션 Explore
                    </div>
                  </div>
                </Fade>
              </div>
            </Fade>

            <Bounce delay={1000}>
              <Link to={`./collect`}>
                <button className="button-bottom">Recollect 시작하기</button>
              </Link>
            </Bounce>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Landing);
