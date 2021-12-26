import { PaginationState } from "./PaginationTypes";
export interface BorrowItemInterfaceState {
	id: string | null;
	note: string;
	box_codes: [];
}

export interface BorrowItemsInterfaceState {
	BorrowItem: BorrowItemInterfaceState;
	BorrowItems: BorrowItemInterfaceState[];
	Cart: any[];
	numberCart: number;
	ErrorBorrowItem?: string;
	Title: string;
	Meta: PaginationState;
}

export type BorrowItemContainerState = BorrowItemsInterfaceState;
