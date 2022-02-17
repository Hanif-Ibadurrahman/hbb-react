import { PaginationState } from "./PaginationTypes";
import { BoxInterfaceState } from "./BoxTypes";
export interface BorrowItemInterfaceState {
	id: string | null;
	delivered_at: string;
	note: string;
	delivery_method: string;
	box_codes: any[];
}

export interface BorrowItemsInterfaceState {
	BorrowItem: BorrowItemInterfaceState;
	BorrowItems: BorrowItemInterfaceState[];
	BorrowList: BoxInterfaceState[];
	Cart: any[];
	numberCart: number;
	ErrorBorrowItem?: string;
	Title: string;
	Meta: PaginationState;
}

export type BorrowItemContainerState = BorrowItemsInterfaceState;
