import * as React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scoped.scss";

export function Pagination(props) {
	return (
		<>
			<ReactPaginate
				previousLabel={"prev"}
				nextLabel={"next"}
				breakLabel={"..."}
				pageCount={props.pageCount}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={props.onPageChange}
				containerClassName={"pagination justify-content-center"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextClassName={"page-item"}
				nextLinkClassName={"page-link"}
				breakClassName={"page-item"}
				breakLinkClassName={"page-link"}
				activeClassName={"active"}
			/>
		</>
	);
}
