import {
	GET_BOXES_LIST,
	CREATE_BOX,
	GET_BOX_DETAIL,
	UPDATE_BOX,
	RESET_BOX_LIST,
	RESET_BOX_FORM,
	SET_BOX_DATA,
} from "../../actions/BoxActions";
import { BoxesInterfaceState, BoxInterfaceState } from "../Types/BoxTypes";
export const initialState: BoxesInterfaceState = {
	Boxes: [],
	Box: {
		Id: "",
		CodeBox: "",
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "BOX",
	ErrorBox: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): BoxesInterfaceState => {
	switch (type) {
		case SET_BOX_DATA:
			return {
				...state,
				Box: payload,
			};
		case GET_BOXES_LIST:
			return {
				...state,
				Boxes: payload.data,
				Meta: {
					LastPage: payload.meta.last_page,
					CurrentPage: payload.meta.current_page,
					Total: payload.meta.total_page,
					PerPage: payload.meta.total_page,
				},
				ErrorBox: payload.errorMessage,
			};
		case GET_BOX_DETAIL:
			return {
				...state,
				Box: {
					CodeBox: payload.data.data.code_box,
					Id: payload.data.data.id,
				},
				ErrorBox: payload.errorMessage,
			};
		case CREATE_BOX:
			return {
				...state,
				Box: {
					CodeBox: payload.data.data.code_box,
					Id: payload.data.data.id,
				},
			};
		case UPDATE_BOX:
			return {
				...state,
				Box: {
					Id: payload.data.id,
					CodeBox: payload.data.code_box,
				},
				ErrorBox: payload.errorMessage,
			};
		case RESET_BOX_LIST:
			return {
				...state,
				Boxes: [],
			};
		case RESET_BOX_FORM:
			return {
				...state,
				Box: {
					Id: "",
					CodeBox: "",
				},
			};
		default:
			return state;
	}
};
