import { PaginationState } from "../Types/PaginationTypes";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { AreaInterfaceState } from "store/Types/AreaTypes";

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
	total_bays: string;
	room: RoomInterfaceState;
	sign_code: string;
	cabinet: {
		code_cabinet: string;
		id: string;
	};
	cabinet_slots: [CabinetSlotInterfaceState]
}

export interface CabinetsInterfaceState {
	Cabinet: CabinetInterfaceState;
	Cabinets: CabinetInterfaceState[];
	ErrorCabinet?: string;
	Title: string;
	Meta: PaginationState;
}

export type CabinetContainerState = CabinetsInterfaceState;
