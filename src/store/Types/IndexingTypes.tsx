import { PaginationState } from "../Types/PaginationTypes";
import { RoomInterfaceState } from "store/Types/RoomTypes";
import { AreaInterfaceState } from "./AreaTypes";
import { BoxInterfaceState } from "./BoxTypes";
import { ClassificationInterfaceState } from "./ClassificationTypes";

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
	classification: ClassificationInterfaceState;
	area: AreaInterfaceState;
	room: RoomInterfaceState;
	box: BoxInterfaceState;
	retention_period: string;
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
