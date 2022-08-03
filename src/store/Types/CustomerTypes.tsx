import { PaginationState } from "./PaginationTypes";
// import { AreaInterfaceState } from "store/Types/AreaTypes";
import { CompanyInterfaceState } from "./CompanyTypes";
import { DivisionInterfaceState } from "./DivisionTypes";

interface userInterface {
	id: string;
}

export interface CustomerInterfaceState {
	id: string | null;
	username: string;
	password: string;
	name: string;
	email: string;
	phone: string;
	location: string;
	company: CompanyInterfaceState;
	division_id: DivisionInterfaceState;
}

export interface CustomersInterfaceState {
	Customer: CustomerInterfaceState;
	Customers: CustomerInterfaceState[];
	ErrorCustomer?: string;
	Title: string;
	Meta: PaginationState;
}

export type CustomerContainerState = CustomersInterfaceState;
