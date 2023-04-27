export interface IUserTokenDecode {
	id: string | null;
	name: string | null;
	nipg: string | null;
	nipg_atasan: string | null;
	nipg_kadiv: string | null;
	id_area: number | null;
	id_satker: number | null;
	id_bisnit: number | null;
	id_company: number | null;
	roles: Object | null;
}

export interface ITokenDecode {
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
	permissions: Object | null;
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
export interface ILoginInterfaceState {
	loginSuccessResponse: ILoginSuccessResponse | null;
	loginFailedResponse: ILoginFailedResponse | null;
	loginRequest: ILoginRequest | null;
	tokenDecode: ITokenDecode | null;
	title: string;
}

export type LoginContainerState = ILoginInterfaceState;
