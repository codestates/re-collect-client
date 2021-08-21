import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ExploreProfileList from '../components/ExploreProfileList';
import BigBookmark from '../components/BigBookmark';
import { useSelector, useDispatch } from 'react-redux';
import { getExploreInfo } from '../actions/getExplore';
import SlickArrow from '../components/SlickArrow';

export default function SimpleSlider() {
	const settings = {
		dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
		infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
		speed: 500, // 애미메이션의 속도, 단위는 milliseconds
		slidesToShow: 4, // 한번에 몇개의 슬라이드를 보여줄 지
		arrows: true, // 옆으로 이동하는 화살표 표시 여부
		slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
		prevArrow: <SlickArrow direction={faArrowLeft} />,
		nextArrow: <SlickArrow direction={faArrowRight} />,

		responsive: [
			// 반응형 웹 구현 옵션
			{
				breakpoint: 1200, //화면 사이즈 1200px
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 900, //화면 사이즈 900px
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600, //화면 사이즈 600px
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	const dispatch = useDispatch();
	const { exploreUsers } = useSelector((state) => state.getExploreReducer);
	const fakeData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

	// 더미데이터 요청 //
	useEffect(() => {
		dispatch(getExploreInfo());
	}, []);

	return (
		<div className="explore">
			<div className="explore__text"> Explore </div>
			<div className="explore__search">
				<div className="explore__searchBar">
					<input type="text" placeholder="search" />
					<button>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
				<div className="explore__recommendation">
					<div className="explore__recommendation__title"> Recommendation </div>
					<div className="explore__recommendation__tags">
						<span> 프론트엔드 해외취업 </span>
						<span> JWT토큰 </span>
						<span> 비동기 이해하기 </span>
						<span> 그림으로 보는 알고리즘 </span>
						<span> 리드개발자가 되기까지</span>
					</div>
				</div>
			</div>

			<div className="explore__RandomProfile">
				<Slider {...settings}>
					{exploreUsers.data.users === undefined
						? fakeData.map((el) => {
							return (
								<ExploreProfileList
									className="explore"
									key={el.id}
									user={el}
									id="carousel"
								/>
							);
						})
						: exploreUsers.data.users.map((userInfo) => {
							return (
								<ExploreProfileList
									className="explore"
									key={userInfo.id}
									user={userInfo}
									id="carousel"
								/>
							);
						})}
				</Slider>
			</div>

			<div className="explore__interestingBookmarks">
				<p> Interesting Bookmarks</p>
				<ul>
					<BigBookmark
						text={'Algebraic Effects'}
						color={'green'}
						url={'https://overreacted.io/algebraic-effects-for-the-rest-of-us/'}
					/>
					<BigBookmark
						text={'redux-thunk로 프로미스다루기'}
						color={'orange'}
						url={
							'https://react.vlpt.us/redux-middleware/05-redux-thunk-with-promise.html'
						}
					/>
					<BigBookmark
						text={'day.js 공식문서'}
						color={'black'}
						url={'https://day.js.org/docs/en/display/difference'}
					/>
					<BigBookmark
						text={'Hook API 참고서'}
						color={'skyblue'}
						url={'https://ko.reactjs.org/docs/hooks-reference.html#useref'}
					/>
					<BigBookmark
						text={'Interceptor란'}
						color={'red'}
						url={'https://docu94.tistory.com/131'}
					/>
				</ul>
			</div>
		</div>
	);
}
