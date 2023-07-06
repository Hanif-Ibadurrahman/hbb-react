export interface INotification {
	id: number;
	type: string | null;
	note: string | null;
}
export interface INotificationGetAllResponse {
	status: string;
	message: string;
	data: INotification | null;
}

export interface IDashboardInterfaceState {
	getAllNotification: INotificationGetAllResponse | null;
	title: string;
}

export interface IApproveForm {
	id: number;
	no_urut: number;
	inventory_name: string;
	inventory_code: string;
	id_inventory_obtained?: number;
	description?: string;
	condition: string;
	reason?: string;
	emp_name?: string;
	id_final_location?: number;
	inventory_return_location?: string;
	id_final_location_return?: number;
	remark: string;

	//only for filter location
	id_final_satker?: number;
}

export type DashboardContainerState = IDashboardInterfaceState;
