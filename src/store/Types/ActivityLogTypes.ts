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

interface LogArchiver {
	name: string;
	count: number;
}

export interface ActivitiLogsArchiver {
	date: string;
	data: LogArchiver[];
	area_id: string;
}

export interface ActivityLogsInterfaceState {
	ActivityLog: ActivityLogInterfaceState;
	ActivityLogs: ActivityLogInterfaceState[];
	ActivityLogsSuperadmin: [ActivitiLogsArchiver];
	ActivityLogsArchiver: [ActivitiLogsArchiver];
	ErrorActivityLogs?: string;
	Title: string;
	Meta: PaginationState;
}

export type ActivityLogContainerState = ActivityLogsInterfaceState;
