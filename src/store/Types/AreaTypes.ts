import { PaginationState } from "./PaginationTypes";
export interface AreaInterfaceState {
	id: string | null;
	name: string;
	code_area: string;
}

export interface AreasInterfaceState {
	Area: AreaInterfaceState;
	Areas: AreaInterfaceState[];
	ErrorArea?: string;
	Title: string;
	Meta: PaginationState;
}

export type AreaContainerState = AreasInterfaceState;
