import {
	GET_TRANSPORTER_LIST,
	SET_USER_DATA,
	GET_ARCHIVER_LIST,
} from "../../actions/UserAction";
import { UsersInterfaceState } from "../Types/UserTypes";
export const initialState: UsersInterfaceState = {
	Users: [],
	User: {
		id: "",
		username: "",
		last_login: "",
		staff: {
			id: "",
			nik: "",
			name: "",
			room: "",
		},
	},
	Meta: {
		Total: 0,
		PerPage: 0,
		CurrentPage: 1,
		LastPage: 1,
	},
	Title: "Transporter",
	ErrorUser: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): UsersInterfaceState => {
	switch (type) {
		case SET_USER_DATA:
			return {
				...state,
				User: payload,
			};
		case GET_TRANSPORTER_LIST:
			return {
				...state,
				Users: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorUser: payload.errorMessage,
			};
		case GET_ARCHIVER_LIST:
			return {
				...state,
				Users: payload.data,
				Meta: {
					LastPage: payload?.meta?.last_page,
					CurrentPage: payload?.meta?.current_page,
					Total: payload?.meta?.total_page,
					PerPage: payload?.meta?.total_page,
				},
				ErrorUser: payload.errorMessage,
			};
		default:
			return state;
	}
};
