import { combineReducers } from "redux";
import profileReducer from './editProfile';
const rootReducer = combineReducers({
  profileReducer,
});

export default rootReducer;
