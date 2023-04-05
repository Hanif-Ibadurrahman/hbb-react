import {
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	SET_LOGIN_DATA,
	DECODE_TOKEN,
} from "../../actions/loginAction";
import { ILoginInterfaceState } from "../types/loginTypes";

export const initialState: ILoginInterfaceState = {
	loginSuccessResponse: null,
	loginFailedResponse: null,
	loginRequest: null,
	tokenDecode: null,
	title: "Login",
};

export const loginReducer = (
	state = initialState,
	{ type, payload },
): ILoginInterfaceState => {
	switch (type) {
		case SET_LOGIN_DATA:
			return {
				...state,
				loginRequest: payload,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				loginSuccessResponse: payload,
			};
		case DECODE_TOKEN:
			return {
				...state,
				tokenDecode: payload,
			};
		case LOGIN_FAILED:
			return {
				...state,
				loginFailedResponse: payload,
			};
		default:
			return state;
	}
};
