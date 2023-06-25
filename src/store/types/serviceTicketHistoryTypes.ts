import { PaginationState } from "./paginationTypes";

export interface IServiceTicketHistory {
	id: number;
	id_approval: number | null;
	transaction_id: number | null;
	status: string | null;
	type: string | null;
	name: string | null;
	no_urut: number | null;
	created_at: string | null;
}

export interface IApprovalLog {
	name: string;
	is_approved: boolean;
	is_rejected: boolean;
	created_at: string;
	updated_at: string | null;
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
	id_bisnis_unit?: number;
	requester?: string;
}

export interface IExportRecapitulationParams {
	id_bisnis_unit?: number;
	type?: string;
	tanggal_awal?: string;
	tanggal_akhir?: string;
	requestor?: string;
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
