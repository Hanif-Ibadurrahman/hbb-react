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

interface companySummary {
	id: string;
	name: string;
}

export interface DahsboardSummaryInterface {
	total_documents: number;
	total_companies: number;
	listCompanies: companySummary[];
	total_cabinets: number;
	total_cabinet_slots: number;
	free_cabinet_slots: number;
	filled_boxes: number;
	free_boxes: number;
}

export interface ActivityLogsInterfaceState {
	ActivityLog: ActivityLogInterfaceState;
	ActivityLogs: ActivityLogInterfaceState[];
	ActivityLogsSuperadmin: ActivitiLogsArchiver[];
	ActivityLogsArchiver: ActivitiLogsArchiver[];
	DashboardSummary: DahsboardSummaryInterface;
	ErrorActivityLogs?: string;
	Title: string;
	Meta: PaginationState;
}

export type ActivityLogContainerState = ActivityLogsInterfaceState;
