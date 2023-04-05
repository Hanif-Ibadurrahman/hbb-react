import { combineReducers } from "redux";
import { countryReducer } from "./countryReducer";
import { countryFilterReducer } from "./countryFilterReducer";

export default combineReducers({
	countryReducer,
	countryFilterReducer,
});
