import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../modules';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

<<<<<<< HEAD
export default store;
=======
export default store;
>>>>>>> 1484212a253c2b41665280d4afa0b09519c6408a
