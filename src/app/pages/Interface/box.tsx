interface PaginatedBoxResponse {
	data: BoxResponse[];
	meta: {
		current_page: number;
		first_page: number;
		first_page_url: string | undefined;
		last_page: number;
		last_page_url: string | undefined;
		next_page_url: string | undefined;
		per_page: number;
		previous_page_url: undefined;
		total: number;
	};
}

interface BoxResponse {
	key: string;
	code_box: string;
	created_at: string;
	updated_at: string;
}

export default PaginatedBoxResponse;
