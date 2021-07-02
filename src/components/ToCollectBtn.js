import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ToCollectBtn() {
  return (
    <div className="recollect__toCollectBtn">
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
}
