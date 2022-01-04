import { PaginationState } from "../Types/PaginationTypes";
import { TransporterInterfaceState } from "./TransporterTypes";
import { ArchiverInterfaceState } from "./ArchiverTypes";
export interface RequestBoxInterfaceState {
	id: string | null;
	quantity: string;
	note: string;
	status: string;
	delivered_at: string;
	delivery_method: string;
	code_boxes: [];
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
	ErrorRequestBox?: string;
	Title: string;
	Meta: PaginationState;
}

export type RequestBoxContainerState = RequestBoxesInterfaceState;
