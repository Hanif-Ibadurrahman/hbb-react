import { PaginationState } from "../Types/PaginationTypes";
export interface BoxInterfaceState {
	Id: string | null;
	CodeBox: string;
}

export interface BoxesInterfaceState {
	Box: BoxInterfaceState;
	Boxes: BoxInterfaceState[];
	ErrorBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type BoxContainerState = BoxesInterfaceState;
