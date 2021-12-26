import { PaginationState } from "../Types/PaginationTypes";
export interface CabinetInterfaceState {
	Id: string | null;
	CodeCabinet: string;
	CodeBlockNumb: string;
	CodeTotalBays: string;
	CodeTotalRow: string;
	CodeTotalColumns: string;
	CodeDepth: string;
	CodeRoom: string;
	SignCode: string;
	CabinetSlots: [
		{
			Id: string | null;
			Code: string;
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
