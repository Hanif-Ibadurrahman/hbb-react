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

export interface StaffInterfaceState {
	id: string | null;
	username: string;
	password: string;
	nip: string;
	name: string;
	role_id: RolesInterfaceState;
	room_id: RoomInterfaceState;
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
