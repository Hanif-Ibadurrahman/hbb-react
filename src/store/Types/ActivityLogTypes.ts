import { PaginationState } from "./PaginationTypes";

export interface ActivityLogInterfaceState {
	id: number;
	log_name: string;
	description: string;
	subject_type: string;
	subject_id: string;
	causer_type: string;
	causer_id: number;
	properties: string;
	created_at: string;
	updated_at: string;
}

export interface ActivityLogsInterfaceState {
	ActivityLog: ActivityLogInterfaceState;
	ActivityLogs: ActivityLogInterfaceState[];
	ErrorRequestBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type ActivityLogContainerState = ActivityLogsInterfaceState;
