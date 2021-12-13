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
}

export interface CabinetsInterfaceState {
	Cabinet: CabinetInterfaceState;
	Cabinets: CabinetInterfaceState[];
	ErrorCabinet?: string;
	Title: string;
	Meta: PaginationState;
}

// interface AutocompleteOption {
// 	label: string;
// }
// // or
// type AutocompleteOptions = string;

export type CabinetContainerState = CabinetsInterfaceState;
