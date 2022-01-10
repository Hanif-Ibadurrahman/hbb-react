import {
	GET_CABINETS_LIST,
	CREATE_CABINET,
	GET_CABINET_DETAIL,
	UPDATE_CABINET,
	RESET_CABINET_LIST,
	RESET_CABINET_FORM,
	SET_CABINET_DATA,
} from "../../actions/CabinetAction";
import {
	CabinetsInterfaceState,
	CabinetInterfaceState,
} from "../Types/CabinetTypes";
// import { AreaInterfaceState } from "store/Types/AreaTypes";

export const initialState: CabinetsInterfaceState = {
	Cabinets: [],
	Cabinet: {
		id: "",
		code_cabinet: "",
		block_number: "",
		total_bays: "",
		total_rows: "",
		total_columns: "",
		depth: "",
		room: {
			id: "",
			name: "",
			code_room: "",
			area: {
				id: "",
				name: "",
				code_area: "",
			},
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "CABINET",
	ErrorCabinet: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): CabinetsInterfaceState => {
	switch (type) {
		case SET_CABINET_DATA:
			return {
				...state,
				Cabinet: payload,
			};
		case GET_CABINETS_LIST:
			return {
				...state,
				Cabinets: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total_page,
					per_page: payload?.meta?.total_page,
				},
				ErrorCabinet: payload.errorMessage,
			};
		case GET_CABINET_DETAIL:
			return {
				...state,
				Cabinet: payload?.data?.data,
				ErrorCabinet: payload.errorMessage,
			};
		case CREATE_CABINET:
			return {
				...state,
				Cabinet: payload?.data?.data,
			};
		case UPDATE_CABINET:
			return {
				...state,
				Cabinet: payload?.data?.data,
				ErrorCabinet: payload.errorMessage,
			};
		case RESET_CABINET_LIST:
			return {
				...state,
				Cabinets: [],
			};
		case RESET_CABINET_FORM:
			return {
				...state,
				Cabinet: {
					id: "",
					code_cabinet: "",
					block_number: "",
					total_bays: "",
					total_rows: "",
					total_columns: "",
					depth: "",
					room: {
						id: "",
						name: "",
						code_room: "",
						area: {
							id: "",
							name: "",
							code_area: "",
						},
					},
				},
			};
		default:
			return state;
	}
};
