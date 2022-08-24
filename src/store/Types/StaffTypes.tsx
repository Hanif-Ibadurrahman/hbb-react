import { PaginationState } from "./PaginationTypes";
import { RoomInterfaceState } from "./RoomTypes";

interface permissions {
	id: string | null;
	name: string;
	display_name: string;
}

export interface RolesInterfaceState {
	id: string | null;
	name: string;
	display_name: string;
	permissions: permissions[];
}

export interface StaffIdInterfaceState {
	id: string | null;
	name: string;
	nip: string;
	email: string;
	room: string;
	firebase_token: string;
}

export interface RoleInterfaceState {
	id: string | null;
	username: string;
	roles: RolesInterfaceState[];
}

export interface StaffInterfaceState {
	id: string | null;
	username: string;
	password: string;
	nip: string;
	name: string;
	email: string;
	user: RoleInterfaceState;
	roles: RolesInterfaceState;
	room: RoomInterfaceState;
	staff: StaffIdInterfaceState;
}

export interface StaffsInterfaceState {
	Staff: StaffInterfaceState;
	Staffs: StaffInterfaceState[];
	Roles: RolesInterfaceState[];
	ErrorStaff?: string;
	Title: string;
	Meta: PaginationState;
}

export type StaffContainerState = StaffsInterfaceState;
