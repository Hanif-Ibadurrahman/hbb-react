import jwtDecode from "jwt-decode";
import { ILoginRequest, ILoginTokenDecode } from "store/Types/LoginTypes";
import { login } from "api/login";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const DECODE_TOKEN = "DECODE_TOKEN";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LoginAction = async (data: ILoginRequest) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_LOGIN_DATA,
				payload: data,
			});
			const response = await login(data);

			sessionStorage.setItem("Token", response.token);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.token,
			});

			const dataDecode: ILoginTokenDecode = jwtDecode(response.token);

			dispatch({
				type: DECODE_TOKEN,
				payload: dataDecode,
			});

			return dataDecode;
		} catch (error: any) {
			dispatch({
				type: LOGIN_FAILED,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			throw error;
		}
	};
};
