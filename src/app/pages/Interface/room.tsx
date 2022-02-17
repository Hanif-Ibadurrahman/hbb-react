interface PaginatedRoomResponse {
	data: RoomResponse[];
	meta: {
		current_page: number;
		first_page: number;
		last_page: number;
		first_page_url: string | undefined;
		last_page_url: string | undefined;
		next_page_url: string | undefined;
		previous_page_url: undefined;
		per_page: number;
		total: number;
	};
}

interface RoomResponse {
	id: string;
	code_room: string;
	created_at: string;
	updated_at: string;
	area: Array<string>;
}

export default PaginatedRoomResponse;
