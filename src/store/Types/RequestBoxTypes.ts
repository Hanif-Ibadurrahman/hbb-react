import { PaginationState } from "../Types/PaginationTypes";
export interface RequestBoxInterfaceState {
	Id: string | null;
	Quantity: string;
	Note: string;
	Status: string;
	DeliveredAt: string;
	CodeBoxes: [
		{
			Id_Box: string;
		},
	];
}

export interface ApprovalInterfaceState {
	Id: string | null;
	Approved: boolean;
	Description: string;
}

export interface ApprovalOperationInterfaceState {
	Id: string | null;
	Approved: boolean;
	Date: string;
	Archiver: string;
	Transporter: string;
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
