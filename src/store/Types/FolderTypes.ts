import { PaginationState } from "../Types/PaginationTypes";
export interface FolderInterfaceState {
	Id: string | null;
	No: string;
	Location: string;
	Status: string;
	SignCode: string;
}

export interface FoldersInterfaceState {
	Folder: FolderInterfaceState;
	Folders: FolderInterfaceState[];
	ErrorFolder?: string;
	Title: string;
	Meta: PaginationState;
}

export type FolderContainerState = FoldersInterfaceState;
