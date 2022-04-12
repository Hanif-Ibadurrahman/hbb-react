import { PaginationState } from "../Types/PaginationTypes";
import { TransporterInterfaceState } from "./TransporterTypes";
import { ArchiverInterfaceState } from "./ArchiverTypes";
import { CustomerInterfaceState } from "./CustomerTypes";
import { BoxInterfaceState } from "./BoxTypes";
export interface RequestBoxInterfaceState {
	id: string | null;
	quantity: string;
	note: string;
	status: string;
	delivered_at: string;
	delivery_method: string;
	type: string;
	code_boxes: [];
	request_logs: [
		{
			time: string;
			status: string;
		},
	];
	created_at: string;
	request_items: [
		{
			box: BoxInterfaceState;
			status: string;
		},
	];
	customer: CustomerInterfaceState;
}

export interface ApprovalInterfaceState {
	Id: string | null;
	Approved: boolean;
	Description: string;
}

export interface ApprovalOperationInterfaceState {
	id: string | null;
	is_approved: boolean;
	delivery_date: string;
	archiver_id: ArchiverInterfaceState;
	transporter_id: TransporterInterfaceState;
}

export interface RequestBoxesInterfaceState {
	ApprovalAdmin: ApprovalInterfaceState;
	ApprovalOperation: ApprovalOperationInterfaceState;
	RequestBox: RequestBoxInterfaceState;
	RequestBoxes: RequestBoxInterfaceState[];
	ApprovalRequest: RequestBoxInterfaceState[];
	ErrorRequestBox?: string;
	Title: string;
	Meta: PaginationState;
	CSROperationNotif: PaginationState;
	CSRAdminNotif: PaginationState;
}

export type RequestBoxContainerState = RequestBoxesInterfaceState;
