import { PaginationState } from "../Types/PaginationTypes";
import { AreaInterfaceState } from "store/Types/AreaTypes";

export interface RoomInterfaceState {
	id: string | null;
	name: string;
	code_room: string;
	area: AreaInterfaceState;
}

export interface RoomsInterfaceState {
	Room: RoomInterfaceState;
	Rooms: RoomInterfaceState[];
	ErrorRoom?: string;
	Title: string;
	Meta: PaginationState;
}

export type RoomContainerState = RoomsInterfaceState;
