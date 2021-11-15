import { GET_DOCUMENTS_LIST } from "../../actions/DocumentAction";

let initialState = {
	documents: [],
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorAreasList: "",
	errorAreasDetail: "",
	title: "AREA",
};

const documents = (state = initialState, action) => {
	switch (action.type) {
		case GET_DOCUMENTS_LIST:
			return {
				...state,
				documents: action.payload.data.data,
				meta: action.payload.data.meta,
				errorAreasList: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default documents;
