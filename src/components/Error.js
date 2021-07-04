import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="error">
      <div className="error__box">
        <p className="error__text">
          Sorry, this page can’t be found.
          <br />
          We’ll be back up shortly.
        </p>
        <Link to="/" className="error__toHomeBtn">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Error;
