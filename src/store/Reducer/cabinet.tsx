import {
	GET_CABINETS_LIST,
	GET_CABINET_DETAIL,
} from "../../actions/CabinetAction";

let initialState = {
	cabinets: [],
	CabinetDetail: [],
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorCabinetsList: "",
	errorCabinetsDetail: "",
	title: "CABINET",
};

const cabinets = (state = initialState, action) => {
	switch (action.type) {
		case GET_CABINETS_LIST:
			return {
				...state,
				cabinets: action.payload.data.data,
				meta: action.payload.data.meta,
				errorCabinetsList: action.payload.errorMessage,
			};
		case GET_CABINET_DETAIL:
			return {
				...state,
				CabinetDetail: action.payload.data.data,
				errorCabinetDetail: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default cabinets;
