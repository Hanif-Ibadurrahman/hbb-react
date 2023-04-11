import { combineReducers } from "redux";
import { countryViewReducer } from "./countryViewReducer";
import { countryFilterReducer } from "./countryGetAllReducer";

export default combineReducers({
	countryViewReducer,
	countryFilterReducer,
});
