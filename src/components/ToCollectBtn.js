import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ToCollectBtn({ viewHandler }) {
	return (
		<div
			className="recollect__toCollectBtn"
			onClick={() => {
				viewHandler();
			}}
		>
			<FontAwesomeIcon icon={faArrowLeft} />
		</div>
	);
}
