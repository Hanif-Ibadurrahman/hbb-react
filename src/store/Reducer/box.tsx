import { GET_BOXES_LIST } from "../../actions/BoxActions";
import { EDIT_BOX } from "../../actions/BoxActions";

let initialState = {
	boxes: [],
	key: "",
	code_box: "",
	meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
	},
	errorBoxesList: "",
	errorBoxesDetail: "",
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
