import { PaginationState } from "../Types/PaginationTypes";

export interface ClassificationInterfaceState {
	id: string;
	name: string;
	type: string;
	code: string;
	retention_period: string;
}

export interface ClassificationsInterfaceState {
	Classification: ClassificationInterfaceState;
	Classifications: ClassificationInterfaceState[];
	Title: string;
	Meta: PaginationState;
}

export type ClassificationContainerState = ClassificationsInterfaceState;
