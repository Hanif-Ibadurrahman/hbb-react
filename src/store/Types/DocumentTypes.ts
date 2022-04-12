import { PaginationState } from "../Types/PaginationTypes";
import { CompanyInterfaceState } from "./CompanyTypes";

interface BoxDocumentInterfaceState {
	id: string | null;
	code_box: string;
}

interface FolderDocumentInterfaceState {
	id: string | null;
	location: string;
	no: string;
	sign_code: string;
}
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
	box: BoxDocumentInterfaceState;
	folder: FolderDocumentInterfaceState;
	company: CompanyInterfaceState;
}

export interface DocumentsInterfaceState {
	Document: DocumentInterfaceState;
	Documents: DocumentInterfaceState[];
	ErrorDocument?: string;
	Title: string;
	Meta: PaginationState;
}

export type DocumentContainerState = DocumentsInterfaceState;
