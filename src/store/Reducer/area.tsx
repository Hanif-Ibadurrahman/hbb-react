import { GET_AREAS_LIST, GET_DATA_META } from "../../actions/AreaAction";

let initialState = {
	areas: [],
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorAreasList: "",
	errorAreasDetail: "",
	title: "AREA",
};

const areas = (state = initialState, action) => {
	switch (action.type) {
		case GET_AREAS_LIST:
			return {
				...state,
				areas: action.payload.data.data,
				meta: action.payload.data.meta,
				errorAreasList: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default areas;
