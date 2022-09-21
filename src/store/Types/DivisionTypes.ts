import { PaginationState } from "../Types/PaginationTypes";
import { CompanyInterfaceState } from "./CompanyTypes";

interface CompanyInterfaceDivision {
	id: string | null;
	name: string;
	code: number;
	location: string;
}

interface CustomerInterfaceDivision {
	id: string | null;
	name: string;
	phone: string;
	email: string;
	location: string;
	company: CompanyInterfaceDivision;
}
export interface DivisionInterfaceState {
	id: string | null;
	name: string;
	company?: CompanyInterfaceState;
	customers: CustomerInterfaceDivision[];
}

export interface DivisionsInterfaceState {
	Division: DivisionInterfaceState;
	Divisions: DivisionInterfaceState[];
	ErrorDivision?: string;
	Title: string;
	Meta: PaginationState;
}

export type DivisionContainerState = DivisionsInterfaceState;
