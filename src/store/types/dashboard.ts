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

export type DashboardContainerState = IDashboardInterfaceState;
