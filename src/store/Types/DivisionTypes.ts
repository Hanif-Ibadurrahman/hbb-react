import { PaginationState } from "../Types/PaginationTypes";
export interface DivisionInterfaceState {
	id: string | null;
	name: string;
}

export interface DivisionsInterfaceState {
	Division: DivisionInterfaceState;
	Divisions: DivisionInterfaceState[];
	ErrorDivision?: string;
	Title: string;
	Meta: PaginationState;
}

export type DivisionContainerState = DivisionsInterfaceState;
