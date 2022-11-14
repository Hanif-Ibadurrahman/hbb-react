import {
	GET_BOXES_LIST,
	CREATE_BOX,
	GET_BOX_DETAIL,
	UPDATE_BOX,
	RESET_BOX_LIST,
	RESET_BOX_FORM,
	SET_BOX_DATA,
	FILTER_BOXES,
	GET_BOXES_NOT_PAGE,
	ADD_VALUES_FILTER,
} from "../../actions/BoxActions";
import { BoxesInterfaceState, BoxInterfaceState } from "../Types/BoxTypes";
export const initialState: BoxesInterfaceState = {
	Boxes: [],
	Box: {
		id: "",
		code_box: "",
		sign_code: "",
		status: "",
		location: "",
		created_at: "",
		custom_code_box: "",
		implementer_code: "",
		is_filled: false,
		implementer_by: {
			id: "",
			implementer_code: "",
		},
		division: {
			id: "",
			code: "",
			name: "",
			code_division: "",
		},
		folders: [
			{
				id: "",
				no: "",
				sign_code: "",
				status: "",
				location: "",
			},
		],
		cabinet_slot: {
			id: "",
			capacity: 0,
			code: "",
			column: "",
			name: "",
			row: 0,
			sign_code: "",
		},
		company: {
			id: "",
			code: "",
			name: "",
			location: "",
			longitude: "",
			latitude: "",
			person_responsible: "",
			npwp: "",
			email: "",
			phone: "",
			address: "",
			amount_access: "",
			service_types: [
				{
					type: "box",
					value: false,
				},
				{
					type: "folder",
					value: false,
				},
				{
					type: "document",
					value: false,
				},
			],
			is_agree: true,
		},
	},
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
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
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorBox: payload.errorMessage,
			};
		case ADD_VALUES_FILTER:
			return {
				...state,
				Box: payload,
			};
		case GET_BOXES_NOT_PAGE:
			return {
				...state,
				Boxes: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorBox: payload.errorMessage,
			};
		case FILTER_BOXES:
			return {
				...state,
				Boxes: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorBox: payload.errorMessage,
			};
		case GET_BOX_DETAIL:
			return {
				...state,
				Box: payload?.data?.data,
				ErrorBox: payload.errorMessage,
			};
		case CREATE_BOX:
			return {
				...state,
				Box: payload?.data?.data,
			};
		case UPDATE_BOX:
			return {
				...state,
				Box: payload?.data?.data,
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
					id: "",
					code_box: "",
					sign_code: "",
					status: "",
					location: "",
					created_at: "",
					custom_code_box: "",
					implementer_code: "",
					is_filled: false,
					implementer_by: {
						id: "",
						implementer_code: "",
					},
					division: {
						id: "",
						code: "",
						code_division: "",
						name: "",
					},
					folders: [
						{
							id: "",
							no: "",
							sign_code: "",
							status: "",
							location: "",
						},
					],
					cabinet_slot: {
						id: "",
						capacity: 0,
						code: "",
						column: "",
						name: "",
						row: 0,
						sign_code: "",
					},
					company: {
						id: "",
						code: "",
						name: "",
						location: "",
						longitude: "",
						latitude: "",
						person_responsible: "",
						npwp: "",
						email: "",
						phone: "",
						address: "",
						amount_access: "",
						service_types: [
							{
								type: "box",
								value: false,
							},
							{
								type: "folder",
								value: false,
							},
							{
								type: "document",
								value: false,
							},
						],
						is_agree: true,
					},
				},
			};
		default:
			return state;
	}
};
