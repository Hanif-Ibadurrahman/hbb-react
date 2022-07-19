import { LOGIN_DATA, SET_LOGIN_DATA } from "../../actions/LoginAction";
import { LoginsInterfaceState } from "../Types/LoginTypes";
export const initialState: LoginsInterfaceState = {
	Login: {
		username: "",
		password: "",
		token: {
			token: "",
			type: "",
		},
		data: {
			roles: [""],
			user: {
				id: "",
				username: "",
				staff: {
					email: "",
					firebase_token: "",
					firebase_token_expired: "",
					firebase_token_updated: "",
					id: "",
					name: "",
					nik: "",
					room: "",
				},
			},
		},
	},
	user: [],
	Title: "Login",
	ErrorLogin: undefined,
};
export default (
	state = initialState,
	{ type, payload },
): LoginsInterfaceState => {
	switch (type) {
		case SET_LOGIN_DATA:
			return {
				...state,
				Login: payload,
			};
		case LOGIN_DATA:
			return {
				...state,
				// Login: {
				//     username: payload?.data?.data?.username,
				//     password: payload?.data?.data?.password,
				// },
				user: payload,
			};
		default:
			return state;
	}
};
