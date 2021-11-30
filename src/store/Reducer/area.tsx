import { GET_AREAS_LIST } from "../../actions/AreaActions";
import { AreasInterfaceState, AreaInterfaceState } from "../Types/AreaTypes";

export const initialState: AreasInterfaceState = {
	Areas: [],
	Area: {
		Id: "",
		CodeArea: "",
		Name: "",
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "AREA",
	ErrorArea: undefined,
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
