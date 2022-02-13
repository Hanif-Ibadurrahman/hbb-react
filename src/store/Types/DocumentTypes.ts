import { PaginationState } from "../Types/PaginationTypes";
export interface DocumentInterfaceState {
	id: string | null;
	no: string;
	date: string;
	detail: string;
	nominal: number;
	active_year_for: number;
	level_progress: string;
	media_storage: string;
	condition: string;
	amount: number;
	cross_point: string;
	description: string;
	no_digital: string;
	location: string;
	status: string;
	sign_code: string;
}

export interface DocumentsInterfaceState {
	Document: DocumentInterfaceState;
	Documents: DocumentInterfaceState[];
	ErrorDocument?: string;
	Title: string;
	Meta: PaginationState;
}

export type DocumentContainerState = DocumentsInterfaceState;
