import {
	GET_DIVISIONS_LIST,
	CREATE_DIVISION,
	GET_DIVISION_DETAIL,
	UPDATE_DIVISION,
	RESET_DIVISION_LIST,
	RESET_DIVISION_FORM,
	SET_DIVISION_DATA,
} from "../../actions/DivisionAction";
import {
	DivisionsInterfaceState,
	DivisionInterfaceState,
} from "../Types/DivisionTypes";
export const initialState: DivisionsInterfaceState = {
	Divisions: [],
	Division: {
		id: "",
		name: "",
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "DIVISION",
	ErrorDivision: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): DivisionsInterfaceState => {
	switch (type) {
		case SET_DIVISION_DATA:
			return {
				...state,
				Division: payload,
			};
		case GET_DIVISIONS_LIST:
			return {
				...state,
				Divisions: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorDivision: payload.errorMessage,
			};
		case GET_DIVISION_DETAIL:
			return {
				...state,
				Division: {
					name: payload?.data?.data?.name,
					id: payload?.data?.data?.id,
				},
				ErrorDivision: payload.errorMessage,
			};
		case CREATE_DIVISION:
			return {
				...state,
				Division: {
					name: payload.data.data.name,
					id: payload.data.data.id,
				},
			};
		case UPDATE_DIVISION:
			return {
				...state,
				Division: {
					id: payload.data.id,
					name: payload.data.name,
				},
				ErrorDivision: payload.errorMessage,
			};
		case RESET_DIVISION_LIST:
			return {
				...state,
				Divisions: [],
			};
		case RESET_DIVISION_FORM:
			return {
				...state,
				Division: {
					id: "",
					name: "",
				},
			};
		default:
			return state;
	}
};
