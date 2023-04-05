import { api, apiWithToken } from "api/dox";

import { ILoginRequest } from "store/types/loginTypes";

export const loginApi = (data: ILoginRequest) => {
	const payload: any = data;
	const response = api.post("/api/auth/login", payload);
	return response;
};

export const logoutApi = () => {
	const response = apiWithToken.post("/api/auth/logout");
	return response;
};
