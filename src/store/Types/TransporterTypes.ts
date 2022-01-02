import { PaginationState } from "./PaginationTypes";
export interface TransporterInterfaceState {
	id: string | null;
	username: string;
	last_login: string;
	roles: RolesInterfaceState;
	staff: StaffInterfaceState;
}

export interface RolesInterfaceState {
	id: string | null;
	name: string;
	display_name: string;
}
export interface StaffInterfaceState {
	id: string | null;
	nik: string;
	name: string;
	room: string;
}

export interface TransportersInterfaceState {
	Transporter: TransporterInterfaceState;
	Transporters: TransporterInterfaceState[];
	ErrorTransporter?: string;
	Title: string;
	Meta: PaginationState;
}

export type TransporterContainerState = TransportersInterfaceState;
