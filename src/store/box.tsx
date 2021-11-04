import { GET_BOXES_LIST } from "../actions/userActions";

let initialState = {
	getBoxesList: false,
	errorBoxesList: false,
	title: "DOX",
};

const box = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOXES_LIST:
			return {
				...state,
				getBoxesList: action.payload.data,
				errorBoxesList: action.payload.errorMessage,
			};

		default:
			return state;
	}
};

export default box;
