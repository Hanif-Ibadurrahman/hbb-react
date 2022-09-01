export interface StaffInterface {
	email: string;
	firebase_token: string;
	firebase_token_expired: string;
	firebase_token_updated: string;
	id: string;
	name: string;
	nik: string;
	room: string;
}

export interface LoginInterfaceState {
	username: string;
	password: string;
	email?: string;
	token: {
		token: string;
		type: string;
	};
	data: {
		roles: [""];
		user: {
			id: string;
			username: string;
			staff: StaffInterface;
		};
	};
}
export interface LoginsInterfaceState {
	Login: LoginInterfaceState;
	user: [];
	ErrorLogin?: string;
	Title: string;
}

export type LoginContainerState = LoginsInterfaceState;
