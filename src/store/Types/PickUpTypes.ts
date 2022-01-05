import { PaginationState } from "./PaginationTypes";
import { BoxInterfaceState } from "./BoxTypes";
export interface PickUpItemInterfaceState {
	id: string | null;
	delivered_at: string;
	delivery_method: string;
	box_codes: any[];
}

export interface PickUpItemsInterfaceState {
	PickUpItem: PickUpItemInterfaceState;
	PickUpItems: PickUpItemInterfaceState[];
	PickUpItemList: BoxInterfaceState[];
	Cart: any[];
	numberCart: number;
	ErrorPickUpItem?: string;
	Title: string;
	Meta: PaginationState;
}

export type PickUpItemContainerState = PickUpItemsInterfaceState;
