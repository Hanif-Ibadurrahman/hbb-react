import { PaginationState } from "../Types/PaginationTypes";
export interface CarInterfaceState {
	Id: string | null;
	Brand: string;
	Capacity: string;
	LicensePlate: string;
}

export interface CarsInterfaceState {
	Car: CarInterfaceState;
	Cars: CarInterfaceState[];
	ErrorCar?: string;
	Title: string;
	Meta: PaginationState;
}

export type CarContainerState = CarsInterfaceState;
