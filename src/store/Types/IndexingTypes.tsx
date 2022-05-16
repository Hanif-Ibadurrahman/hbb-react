import { PaginationState } from "../Types/PaginationTypes";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { AreaInterfaceState } from "./AreaTypes";

interface documentIndexing {
	id: string;
	no: string;
	detail: string;
	serial_number: string;
}

export interface IndexingInterfaceState {
	id: string | null;
	index: string;
	date: string;
	type: string;
	classification: string;
	area_id: AreaInterfaceState;
	room_id: RoomInterfaceState;
	retention_period: number;
	date_retention: string;
	is_permanent: boolean;
	documents: documentIndexing[];
}

export interface IndexingDocumentInterfaceState {
	id: string | null;
	document_codes: any[];
}

export interface IndexingsInterfaceState {
	Indexing: IndexingInterfaceState;
	Indexings: IndexingInterfaceState[];
	IndexingDocument: IndexingDocumentInterfaceState;
	Cart: any[];
	numberCart: number;
	ErrorIndexing?: string;
	Title: string;
	Meta: PaginationState;
}

export type IndexingContainerState = IndexingsInterfaceState;
