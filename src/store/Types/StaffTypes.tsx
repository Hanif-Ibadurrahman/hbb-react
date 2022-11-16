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
	implementer_code?: string;
}

export interface RoleInterfaceState {
	id: string | null;
	username: string;
	roles: RolesInterfaceState[];
}

interface ImplementerBoxInterfaceState {
	id: string | null;
	implementer_code: string;
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
	implementer_code?: string;
	implementer_by?: ImplementerBoxInterfaceState;
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
