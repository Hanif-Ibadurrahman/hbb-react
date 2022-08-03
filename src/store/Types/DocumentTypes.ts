import { PaginationState } from "../Types/PaginationTypes";
import { CompanyInterfaceState } from "./CompanyTypes";
import { DivisionInterfaceState } from "./DivisionTypes";
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

interface CabinetDocumentInterfaceState {
	id: string | null;
	code_cabinet: string;
}
export interface DocumentInterfaceState {
	id: string | null;
	no: string;
	date: string;
	detail: string;
	document_file: string;
	cabinet?: CabinetDocumentInterfaceState;
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
	division: DivisionInterfaceState;
}

export interface UploadFile {
	file: any;
}

export interface DocumentsInterfaceState {
	Document: DocumentInterfaceState;
	Documents: DocumentInterfaceState[];
	DocumentAssigned: DocumentInterfaceState[];
	UploadFile: UploadFile;
	ErrorDocument?: string;
	Title: string;
	Meta: PaginationState;
}

export type DocumentContainerState = DocumentsInterfaceState;
