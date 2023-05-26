import { PaginationState } from "./paginationTypes";

export interface IServiceTicketHistory {
	id: number;
	type: string | null;
	name: string | null;
	nomor_urut: string | null;
	created_at: string | null;
}

export interface IServiceTicketHistoryPaginateResponse extends PaginationState {
	data: IServiceTicketHistory[];
}

export interface IServiceTicketHistoryGetAllParams {
	page?: number;
	per_page?: number;
	order_by?: string;
	sort?: string;
	type?: string;
	date?: string;
}

export interface IServiceTicketHistoryGetAllResponse {
	status: string;
	message: string;
	data: IServiceTicketHistoryPaginateResponse | null;
}

export interface IServiceTicketHistoryInterfaceState {
	getAllServiceTicketHistoryWithPagination: IServiceTicketHistoryPaginateResponse | null;
	title: string;
}

export type ServiceTicketHistoryContainerState =
	IServiceTicketHistoryInterfaceState;
