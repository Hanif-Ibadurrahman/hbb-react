export interface LoginInterfaceState {
	username: string;
	password: string;
	token: {
		token: string;
		type: string;
	};
	data: {
		roles: [];
		user: {
			id: string;
			username: string;
		}
	}
}

// export interface TokenInterface {
// 	token: []
// }

export interface LoginsInterfaceState {
	Login: LoginInterfaceState;
	user: [];
	// Token: TokenInterface;
	ErrorLogin?: string;
	Title: string;
}

export type LoginContainerState = LoginsInterfaceState;
