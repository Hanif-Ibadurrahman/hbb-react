import { PaginationState } from "../Types/PaginationTypes";
export interface CabinetInterfaceState {
	id: string | null;
	code_cabinet: string;
	CodeBlockNumb: string;
	total_bays: string;
	CodeTotalRow: string;
	CodeTotalColumns: string;
	CodeDepth: string;
	CodeRoom: string;
	SignCode: string;
	cabinetSlots: [
		{
			id: string | null;
			code: string;
			Capacity: number;
			Column: number;
			Row: number;
			SignCode: string;
		},
	];
}

export interface CabinetsInterfaceState {
	Cabinet: CabinetInterfaceState;
	Cabinets: CabinetInterfaceState[];
	ErrorCabinet?: string;
	Title: string;
	Meta: PaginationState;
}

export type CabinetContainerState = CabinetsInterfaceState;
