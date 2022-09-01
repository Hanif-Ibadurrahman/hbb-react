import { LoginInterfaceState } from "store/Types/LoginTypes";
import { login, reset } from "api/login";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_DATA = "LOGIN_DATA";
export const RESET_ACCOUNT = "RESET_ACCOUNT";

export const Login = async (data: LoginInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_LOGIN_DATA,
				payload: data,
			});
			const response = await login(data);
			localStorage.setItem("Token", response?.data?.token?.token);
			localStorage.setItem(
				"User",
				response?.data?.data?.roles[0] ? response?.data?.data?.roles[0] : "",
			);
			localStorage.setItem("IdUser", response?.data?.data?.user.id);
			localStorage.setItem(
				"UserName",
				response?.data?.data?.user?.staff
					? response?.data?.data?.user?.staff?.name
					: response?.data?.data?.user?.username,
			);
			dispatch({
				type: LOGIN_DATA,
				payload: response?.data,
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: LOGIN_DATA,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			console.log(error);
			throw error;
		}
	};
};

export const ResetPassword = async (data: LoginInterfaceState) => {
	return async dispatch => {
		try {
			dispatch({
				type: SET_LOGIN_DATA,
				payload: data,
			});
			const response = await reset(data);
			dispatch({
				type: RESET_ACCOUNT,
				payload: {
					data: response.data,
					errorMessage: false,
				},
			});
			return response;
		} catch (error: any) {
			dispatch({
				type: RESET_ACCOUNT,
				payload: {
					data: false,
					errorMessage: error?.message,
				},
			});
			console.log(error);
			throw error;
		}
	};
};
