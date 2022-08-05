import { PaginationState } from "../Types/PaginationTypes";
import { CompanyInterfaceState } from "./CompanyTypes";

export interface ClassificationInterfaceState {
	id: string;
	name: string;
	type: string;
	code: string;
	retention_period: string;
	code_classification: string;
	company: CompanyInterfaceState;
}

export interface ClassificationTreeViewInterfaceState {
	code: string;
	text: string;
	nodes?: readonly ClassificationTreeViewInterfaceState[];
}
export interface ClassificationsInterfaceState {
	Classification: ClassificationInterfaceState;
	Classifications: ClassificationInterfaceState[];
	ClassificationTreeView: ClassificationTreeViewInterfaceState[];
	Title: string;
	Meta: PaginationState;
	ErrorClassification?: string;
}

export type ClassificationContainerState = ClassificationsInterfaceState;
