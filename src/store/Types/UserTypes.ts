import { PaginationState } from "../Types/PaginationTypes";
export interface UserInterfaceState {
	id: string | null;
	username: string;
	last_login: string;
	staff: StaffInterfaceState;
}

export interface StaffInterfaceState {
	id: string;
	nik: string;
	name: string;
	room: string;
}

export interface UsersInterfaceState {
	User: UserInterfaceState;
	Users: UserInterfaceState[];
	ErrorUser?: string;
	Title: string;
	Meta: PaginationState;
}

export type UserContainerState = UsersInterfaceState;
