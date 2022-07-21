import {
	GET_STAFFS_LIST,
	CREATE_STAFF,
	GET_STAFF_DETAIL,
	UPDATE_STAFF,
	RESET_STAFF_LIST,
	RESET_STAFF_FORM,
	SET_STAFF_DATA,
	GET_ROLE_LIST,
	SEARCH_STAFF,
} from "../../actions/StaffAction";
import { StaffsInterfaceState } from "../Types/StaffTypes";

export const initialState: StaffsInterfaceState = {
	Staffs: [],
	Staff: {
		id: "",
		username: "",
		password: "",
		nip: "",
		name: "",
		email: "",
		roles: {
			id: "",
			display_name: "",
			name: "",
			permissions: [
				{
					id: "",
					display_name: "",
					name: "",
				},
			],
		},
		room: {
			id: "",
			name: "",
			floor: 0,
			area: {
				id: "",
				code_area: "",
				name: "",
			},
			code_room: "",
		},
		staff: {
			id: "",
			name: "",
			nip: "",
			email: "",
			room: "",
			firebase_token: "",
		},
	},
	Roles: [],
	Meta: {
		total: 0,
		per_page: 0,
		current_page: 1,
		last_page: 1,
	},
	Title: "STAFF",
	ErrorStaff: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): StaffsInterfaceState => {
	switch (type) {
		case SET_STAFF_DATA:
			return {
				...state,
				Staff: payload,
			};
		case GET_STAFFS_LIST:
			return {
				...state,
				Staffs: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorStaff: payload.errorMessage,
			};
		case SEARCH_STAFF:
			return {
				...state,
				Staffs: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorStaff: payload.errorMessage,
			};
		case GET_ROLE_LIST:
			return {
				...state,
				Roles: payload.data,
				Meta: {
					last_page: payload?.meta?.last_page,
					current_page: payload?.meta?.current_page,
					total: payload?.meta?.total,
					per_page: payload?.meta?.per_page,
				},
				ErrorStaff: payload.errorMessage,
			};
		case GET_STAFF_DETAIL:
			return {
				...state,
				Staff: payload?.data?.data,
				ErrorStaff: payload.errorMessage,
			};
		case CREATE_STAFF:
			return {
				...state,
				Staff: payload?.data?.data,
			};
		case UPDATE_STAFF:
			return {
				...state,
				Staff: payload?.data?.data,
				ErrorStaff: payload.errorMessage,
			};
		case RESET_STAFF_LIST:
			return {
				...state,
				Staffs: [],
			};
		case RESET_STAFF_FORM:
			return {
				...state,
				Staff: {
					id: "",
					username: "",
					password: "",
					nip: "",
					name: "",
					email: "",
					roles: {
						id: "",
						display_name: "",
						name: "",
						permissions: [
							{
								id: "",
								display_name: "",
								name: "",
							},
						],
					},
					room: {
						id: "",
						name: "",
						floor: 0,
						area: {
							id: "",
							code_area: "",
							name: "",
						},
						code_room: "",
					},
					staff: {
						id: "",
						name: "",
						nip: "",
						email: "",
						room: "",
						firebase_token: "",
					},
				},
			};
		default:
			return state;
	}
};
