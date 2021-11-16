import {
	GET_DOCUMENTS_LIST,
	GET_DOCUMENT_DETAIL,
} from "../../actions/DocumentAction";

let initialState = {
	documents: [],
	key: "",
	DocumentDetail: "",
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
		case GET_DOCUMENT_DETAIL:
			return {
				...state,
				DocumentDetail: action.payload.data.data,
				errorBoxesDetail: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default documents;
