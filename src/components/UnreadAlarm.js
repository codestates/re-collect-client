import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Jump from 'react-reveal/Jump';

// eslint-disable-next-line no-unused-vars
export default function UnreadAlarm({ viewHandler, unit }) {
	return (
		<div
			className='collectview__alarm'
			onClick={() => {
				viewHandler();
			}}
		>
			<Jump>
				<FontAwesomeIcon className='jello-horizontal' icon={faBell} />
			</Jump>
      한번도 읽지않은 북마크, 클릭하여 확인하세요!
		</div>
	);
}
