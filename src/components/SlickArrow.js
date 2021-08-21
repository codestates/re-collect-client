import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function SlickArrowLeft({ currentSlide, slideCount, ...props }) {
	return (
		<button {...props}>
			<FontAwesomeIcon icon={props.direction} />
		</button>
	);
}

export default SlickArrowLeft;
