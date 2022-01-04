import {
	GET_AREAS_LIST,
	CREATE_AREA,
	GET_AREA_DETAIL,
	UPDATE_AREA,
	RESET_AREA_LIST,
	RESET_AREA_FORM,
	SET_AREA_DATA,
} from "../../actions/AreaActions";
import { AreasInterfaceState, AreaInterfaceState } from "../Types/AreaTypes";

export const initialState: AreasInterfaceState = {
	Areas: [],
	Area: {
		Id: "",
		CodeArea: "",
		Name: "",
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "AREA",
	ErrorArea: undefined,
};

export default (
	state = initialState,
	{ type, payload },
): AreasInterfaceState => {
	switch (type) {
		case SET_AREA_DATA:
			return {
				...state,
				Area: payload,
			};
		case GET_AREAS_LIST:
			return {
				...state,
				Areas: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorArea: payload.errorMessage,
			};
		case GET_AREA_DETAIL:
			return {
				...state,
				Area: {
					Id: payload.data.data.id,
					CodeArea: payload.data.data.code_area,
					Name: payload.data.data.name,
				},
				ErrorArea: payload.errorMessage,
			};
		case CREATE_AREA:
			return {
				...state,
				Area: {
					Id: payload.data.data.id,
					CodeArea: payload.data.data.code_area,
					Name: payload.data.data.name,
				},
			};
		case UPDATE_AREA:
			return {
				...state,
				Area: {
					Id: payload.data.data.id,
					CodeArea: payload.data.data.code_area,
					Name: payload.data.data.name,
				},
				ErrorArea: payload.errorMessage,
			};
		case RESET_AREA_LIST:
			return {
				...state,
				Areas: [],
			};
		case RESET_AREA_FORM:
			return {
				...state,
				Area: {
					Id: "",
					CodeArea: "",
					Name: "",
				},
			};
		default:
			return state;
	}
};
