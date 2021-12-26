import { PaginationState } from "../Types/PaginationTypes";
export interface CarInterfaceState {
	id: string | null;
	brand: string;
	capacity: string;
	license_plate: string;
}

export interface CarsInterfaceState {
	Car: CarInterfaceState;
	Cars: CarInterfaceState[];
	ErrorCar?: string;
	Title: string;
	Meta: PaginationState;
}

export type CarContainerState = CarsInterfaceState;
