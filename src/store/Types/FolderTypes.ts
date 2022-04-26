import { PaginationState } from "../Types/PaginationTypes";
import { DivisionInterfaceState } from "./DivisionTypes";
interface BoxFolderInterface {
	id: string | null;
	code_box: string;
	custom_code_box: string;
	location: string;
	status: string;
}
interface CompanyFolderInterface {
	id: string | null;
	name: string;
	location: string;
	phone: string;
}

interface DocumentFolderInterface {
	id: string | null;
	description: string;
	detail: string;
	media_storage: string;
	status: string;
	condition: string;
	sign_code: string;
}
export interface FolderInterfaceState {
	id: string | null;
	box: BoxFolderInterface;
	cabinet_slot: string;
	company: CompanyFolderInterface;
	documents: [DocumentFolderInterface];
	division: DivisionInterfaceState;
	location: string;
	no: string;
	sign_code: string;
	status: string;
}

export interface FoldersInterfaceState {
	Folder: FolderInterfaceState;
	Folders: FolderInterfaceState[];
	ErrorFolder?: string;
	Title: string;
	Meta: PaginationState;
}

export type FolderContainerState = FoldersInterfaceState;
