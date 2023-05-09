import jwtDecode from "jwt-decode";
import { ILoginRequest, ITokenDecode } from "store/types/loginTypes";
import { loginApi } from "api/login";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const DECODE_TOKEN = "DECODE_TOKEN";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginAction = (data: ILoginRequest) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_LOGIN_DATA,
				payload: data,
			});
			const response = await loginApi(data);

			document.cookie = `token=${response.data.token}; SameSite=lax; Secure`;

			sessionStorage.clear();
			sessionStorage.setItem("Token", response.data.token);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: response.data.token,
			});

			const dataDecode: ITokenDecode = jwtDecode(response.data.token);

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
