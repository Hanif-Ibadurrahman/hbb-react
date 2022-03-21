import { PaginationState } from "../Types/PaginationTypes";
import { CabinetSlotInterfaceState } from "./CabinetTypes";
import { CompanyInterfaceState } from "./CompanyTypes";

interface DivisionBoxInterfaceState {
	id: string | null;
	code: string;
	name: string;
}

interface FolderBoxInterfaceState {
	id: string | null;
	status: string;
	location: string;
	no: string;
	sign_code: string;
}
export interface BoxInterfaceState {
	id: string | null;
	code_box: string;
	sign_code: string;
	status: string;
	location: string;
	created_at: string;
	cabinet_slot: CabinetSlotInterfaceState;
	custom_code_box: string;
	company: CompanyInterfaceState;
	division: DivisionBoxInterfaceState;
	folders: [FolderBoxInterfaceState];
}

export interface BoxesInterfaceState {
	Box: BoxInterfaceState;
	Boxes: BoxInterfaceState[];
	ErrorBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type BoxContainerState = BoxesInterfaceState;
