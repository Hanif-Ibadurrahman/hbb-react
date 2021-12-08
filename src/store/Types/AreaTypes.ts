import { PaginationState } from "./PaginationTypes";
export interface AreaInterfaceState {
	Id: string | null;
	Name: string;
	CodeArea: string;
}

export interface AreasInterfaceState {
	Area: AreaInterfaceState;
	Areas: AreaInterfaceState[];
	ErrorArea?: string;
	Title: string;
	Meta: PaginationState;
}

export type AreaContainerState = AreasInterfaceState;
