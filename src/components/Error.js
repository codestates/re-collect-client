import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="error">
      <div className="error__box">
        <p className="error__text">
          404 - Sorry, this page can’t be found.
        </p>
        <Link to="/" className="error__toHomeBtn">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Error;
