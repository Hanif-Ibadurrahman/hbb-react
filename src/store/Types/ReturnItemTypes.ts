import { PaginationState } from "./PaginationTypes";
import { BoxInterfaceState } from "./BoxTypes";
export interface ReturnItemInterfaceState {
	id: string | null;
	delivery_method: string;
	delivered_at: string;
	note: string;
	box_codes: any[];
}

export interface ReturnItemsInterfaceState {
	ReturnItem: ReturnItemInterfaceState;
	ReturnItems: ReturnItemInterfaceState[];
	ReturnList: BoxInterfaceState[];
	Cart: any[];
	numberCart: number;
	ErrorReturnItem?: string;
	Title: string;
	Meta: PaginationState;
}

export type ReturnItemContainerState = ReturnItemsInterfaceState;
