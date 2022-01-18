import { PaginationState } from "../Types/PaginationTypes";
export interface BoxInterfaceState {
	id: string | null;
	code_box: string;
	sign_code: string;
}

export interface BoxesInterfaceState {
	Box: BoxInterfaceState;
	Boxes: BoxInterfaceState[];
	ErrorBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type BoxContainerState = BoxesInterfaceState;
