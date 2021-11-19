import {
	GET_BOXES_LIST,
	GET_BOX_DETAIL,
	EDIT_BOX,
	CREATE_BOX,
} from "../../actions/BoxActions";

let initialState = {
	boxes: [],
	BoxDetail: "",
	CreateBox: "",
	key: "",
	code_box: "",
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorBoxesList: "",
	errorBoxesDetail: "",
	errorCreateBox: "",
	title: "BOX",
};

const box = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOXES_LIST:
			return {
				...state,
				boxes: action.payload.data.data,
				meta: action.payload.data.meta,
				errorBoxesList: action.payload.errorMessage,
			};
		case GET_BOX_DETAIL:
			return {
				...state,
				BoxDetail: action.payload.data.data,
				errorBoxesDetail: action.payload.errorMessage,
			};
		case CREATE_BOX:
			return {
				...state,
				CreateBox: action.payload.data.data,
				errorCreateBox: action.payload.errorMessage,
			};
		case EDIT_BOX:
			return {
				...state,
				key: action.payload.data.key,
				code_box: action.payload.data.code_box,
				errorBoxesDetail: action.payload.errorMessage,
			};
		default:
			return state;
	}
};

export default box;
