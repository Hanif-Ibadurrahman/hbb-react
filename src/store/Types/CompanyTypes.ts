import { PaginationState } from "../Types/PaginationTypes";
export interface CompanyInterfaceState {
	id: string | null;
	code: string;
	name: string;
	location: string;
	latitude: string;
	longitude: string;
	is_agree: boolean;
	person_responsible: string;
	npwp: string;
	email: string;
	phone: string;
	address: string;
	amount_access: string;
	service_type: [
		{
			type: string;
			value: boolean;
		},
	];
}

export interface CompanysInterfaceState {
	Company: CompanyInterfaceState;
	Companys: CompanyInterfaceState[];
	ErrorCompany?: string;
	Title: string;
	Meta: PaginationState;
}

export type CompanyContainerState = CompanysInterfaceState;
