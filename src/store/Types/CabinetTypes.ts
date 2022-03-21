import { PaginationState } from "../Types/PaginationTypes";
import { RoomInterfaceState } from "store/Types/RoomTypes";

export interface CabinetSlotInterfaceState {
	id: string | null;
	capacity: number;
	code: string;
	column: string;
	name: string;
	row: number;
	sign_code: string;
}
export interface CabinetInterfaceState {
	id: string | null;
	code_cabinet: string;
	block_number: number;
	total_bays: number;
	total_rows: number;
	total_columns: number;
	depth: number;
	room: RoomInterfaceState;
	sign_code: string;
	cabinet: {
		code_cabinet: string;
		id: string;
	};
	cabinet_slots: [CabinetSlotInterfaceState];
}

export interface CabinetsInterfaceState {
	Cabinet: CabinetInterfaceState;
	Cabinets: CabinetInterfaceState[];
	ErrorCabinet?: string;
	Title: string;
	Meta: PaginationState;
}

export type CabinetContainerState = CabinetsInterfaceState;
