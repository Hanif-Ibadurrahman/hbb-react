import { LoginInterfaceState } from "store/Types/LoginTypes";
import { login } from "api/login";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const LOGIN_DATA = "LOGIN_DATA";

export const Login = async (data: LoginInterfaceState) => {
	console.log(data);
	return async dispatch => {
		try {
			dispatch({
				type: SET_LOGIN_DATA,
				payload: data,
			});
			const response = await login(data);
			// console.log("Data Action", response.data.data.user);
			localStorage.setItem("Token", response.data.token.token);
			localStorage.setItem("User", response.data.data.user.username)
			dispatch({
				type: LOGIN_DATA,
				payload: response?.data,
				// payload: {
				//     data: response?.data,
				//     errorMessage: false,
				// },
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
