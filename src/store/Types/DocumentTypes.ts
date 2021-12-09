import { PaginationState } from "../Types/PaginationTypes";
export interface DocumentInterfaceState {
	Id: string | null;
	No: string;
	Date: string;
	Detail: string;
	Nominal: number;
	ActiveYear: number;
	LevelProgress: string;
	MediaStorage: string;
	Condition: string;
	Amount: number;
	CrossPoint: string;
	Description: string;
	NoDigital: string;
	Location: string;
	Status: string;
}

export interface DocumentsInterfaceState {
	Document: DocumentInterfaceState;
	Documents: DocumentInterfaceState[];
	ErrorDocument?: string;
	Title: string;
	Meta: PaginationState;
}

export type DocumentContainerState = DocumentsInterfaceState;
