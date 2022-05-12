import {
	GET_CABINETS_LIST,
	CREATE_CABINET,
	GET_CABINET_DETAIL,
	UPDATE_CABINET,
	RESET_CABINET_LIST,
	RESET_CABINET_FORM,
	FILTER_CABINET,
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
		total_bays: 0,
		block_number: 0,
		depth: 0,
		total_columns: 0,
		total_rows: 0,
		sign_code: "",
		room: {
			id: "",
			name: "",
			code_room: "",
			floor: 0,
			area: {
				id: "",
				name: "",
				code_area: "",
			},
		},
		cabinet: {
			code_cabinet: "",
			id: "",
		},
		cabinet_slots: [
			{
				id: "",
				capacity: 0,
				code: "",
				column: "",
				name: "",
				row: 0,
				sign_code: "",
			},
		],
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
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorCabinet: payload.errorMessage,
			};
		case FILTER_CABINET:
			return {
				...state,
				Cabinets: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
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
					total_bays: 0,
					block_number: 0,
					depth: 0,
					total_columns: 0,
					total_rows: 0,
					sign_code: "",
					room: {
						id: "",
						name: "",
						code_room: "",
						floor: 0,
						area: {
							id: "",
							name: "",
							code_area: "",
						},
					},
					cabinet: {
						code_cabinet: "",
						id: "",
					},
					cabinet_slots: [
						{
							id: "",
							capacity: 0,
							code: "",
							column: "",
							name: "",
							row: 0,
							sign_code: "",
						},
					],
				},
			};
		default:
			return state;
	}
};
