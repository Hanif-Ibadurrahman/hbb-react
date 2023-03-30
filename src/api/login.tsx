import { api } from "api/dox";

import { ILoginRequest, ILoginSuccessResponse } from "store/Types/LoginTypes";

export const login = async (data: ILoginRequest) => {
	const response = api.post<ILoginRequest, ILoginSuccessResponse>(
		"/api/auth/login",
		data,
	);
	return response;
};
