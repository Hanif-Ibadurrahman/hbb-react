export interface PaginationState {
	total: number;
	per_page: number;
	current_page: number;
	last_page: number | null;
	first_page_url: string | null;
	last_page_url: string | null;
	next_page_url: string | null;
	prev_page_url: string | null;
	path: string;
	link: any;
	from: number;
	to: number;
	link: {
		url: string | null;
		label: string | null;
		active: boolean;
	}[];
	data: any;
}
