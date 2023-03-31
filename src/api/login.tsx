import { api, apiWithToken } from "api/dox";

import { ILoginRequest } from "store/Types/LoginTypes";

export const login = (data: ILoginRequest) => {
	const payload: any = data;
	const response = api.post("/api/auth/login", payload);
	return response;
};

export const logout = () => {
	const response = apiWithToken.post("/api/auth/logout");
	return response;
};
