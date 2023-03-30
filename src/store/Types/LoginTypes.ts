export interface IUserTokenDecode {
	id: string | null;
	name: string | null;
	nipg: string | null;
	nipg_atasan: string | null;
	nipg_kadiv: string | null;
	id_area: number | null;
	id_satker: number | null;
	id_bisnit: number | null;
	id_role: number | null;
}

export interface ILoginTokenDecode {
	iss: string | null;
	iat: number | null;
	exp: number | null;
	nbf: number | null;
	jti: string | null;
	sub: string | null;
	prv: string | null;
	token_type: string | null;
	expires_in: number | null;
	user: IUserTokenDecode | null;
	permissions: string[] | null;
}

export interface ILoginRequest {
	username: string;
	password: string;
}
export interface ILoginSuccessResponse {
	token: string;
}

export interface ILoginFailedResponse {
	error: string;
}
export interface LoginsInterfaceState {
	LoginSuccessResponse: ILoginSuccessResponse;
	LoginFailedResponse: ILoginFailedResponse;
	LoginRequest: ILoginRequest;
	TokenDecode: ILoginTokenDecode;
	Title: string;
}

export type LoginContainerState = LoginsInterfaceState;
