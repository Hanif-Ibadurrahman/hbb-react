import { PaginationState } from "../Types/PaginationTypes";
import { CabinetSlotInterfaceState } from "./CabinetTypes";
import { CompanyInterfaceState } from "./CompanyTypes";
export interface BoxInterfaceState {
	id: string | null;
	code_box: string;
	sign_code: string;
	status: string;
	location: string;
	created_at: string;
	cabinet_slot: CabinetSlotInterfaceState;
	company: CompanyInterfaceState;
	folders: [],
}

export interface BoxesInterfaceState {
	Box: BoxInterfaceState;
	Boxes: BoxInterfaceState[];
	ErrorBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type BoxContainerState = BoxesInterfaceState;
