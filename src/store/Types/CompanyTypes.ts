import { PaginationState } from "../Types/PaginationTypes";
export interface CompanyInterfaceState {
	Id: string | null;
	// CodeCompany: string;
	CodeName: string;
	CodeLocation: string;
	CodeLatitude: string;
	CodeLongitude: string;
	CodeAgree: boolean;
	// CodeCreatedate: string;
	// CodeUpdatedate: string;
}

export interface CompanysInterfaceState {
	Company: CompanyInterfaceState;
	Companys: CompanyInterfaceState[];
	ErrorCompany?: string;
	Title: string;
	Meta: PaginationState;
}

export type CompanyContainerState = CompanysInterfaceState;
