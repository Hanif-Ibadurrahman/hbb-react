interface PaginatedDocumentResponse {
	data: DocumentResponse[];
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

interface DocumentResponse {
	key: string;
	no: string;
	date: string;
	detail: string;
	nominal: number;
	active_year_for: number;
	level_progress: string;
	media_storage: string;
	condition: string;
	amount: number;
	cross_point: string;
	description: string;
	no_digital: string;
	created_at: string;
	updated_at: string;
}

export default PaginatedDocumentResponse;
