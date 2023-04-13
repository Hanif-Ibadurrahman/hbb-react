import { api, apiWithToken } from "api";

import { ILoginRequest } from "store/types/loginTypes";

export const loginApi = (input: ILoginRequest) => {
	return api.post("/api/auth/login", input);
};

export const logoutApi = () => {
	return apiWithToken.post("/api/auth/logout");
};
