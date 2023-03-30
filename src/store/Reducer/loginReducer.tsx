import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SET_LOGIN_DATA,
	DECODE_TOKEN,
} from "../../actions/LoginAction";
import { LoginsInterfaceState } from "../Types/LoginTypes";

export const initialState: LoginsInterfaceState = {
	LoginSuccessResponse: {
		token: "",
	},
	LoginFailedResponse: {
		error: "",
	},
	LoginRequest: {
		username: "",
		password: "",
	},
	TokenDecode: {
		iss: null,
		iat: null,
		exp: null,
		nbf: null,
		jti: null,
		sub: null,
		prv: null,
		token_type: null,
		expires_in: null,
		user: null,
		permissions: null,
	},
	Title: "Login",
};

export const loginReducer = (
	state = initialState,
	{ type, payload },
): LoginsInterfaceState => {
	switch (type) {
		case SET_LOGIN_DATA:
			return {
				...state,
				LoginRequest: payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				LoginSuccessResponse: payload,
			};
		case DECODE_TOKEN:
			return {
				...state,
				TokenDecode: payload,
			};
		case LOGIN_FAILED:
			return {
				...state,
				LoginFailedResponse: payload,
			};
		default:
			return state;
	}
};
