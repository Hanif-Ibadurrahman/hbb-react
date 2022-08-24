import { PaginationState } from "./PaginationTypes";
// import { AreaInterfaceState } from "store/Types/AreaTypes";
import { CompanyInterfaceState } from "./CompanyTypes";
import { DivisionInterfaceState } from "./DivisionTypes";

interface userInterface {
	id: string;
	username: string;
}

interface divisionInterface {
	id: string;
	name: string;
	code_division: string;
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
	user: userInterface;
	division: divisionInterface;
}

export interface CustomersInterfaceState {
	Customer: CustomerInterfaceState;
	Customers: CustomerInterfaceState[];
	ErrorCustomer?: string;
	Title: string;
	Meta: PaginationState;
}

export type CustomerContainerState = CustomersInterfaceState;
