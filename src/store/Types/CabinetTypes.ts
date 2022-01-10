import { PaginationState } from "../Types/PaginationTypes";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { AreaInterfaceState } from "store/Types/AreaTypes";
export interface CabinetInterfaceState {
	id: string | null;
	code_cabinet: string;
	block_number: string;
	total_bays: string;
	total_rows: string;
	total_columns: string;
	depth: string;
	room: RoomInterfaceState;
	area?: AreaInterfaceState;
}

export interface CabinetsInterfaceState {
	Cabinet: CabinetInterfaceState;
	Cabinets: CabinetInterfaceState[];
	ErrorCabinet?: string;
	Title: string;
	Meta: PaginationState;
}

export type CabinetContainerState = CabinetsInterfaceState;
