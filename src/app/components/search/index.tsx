export const Search = () => {
	return (
		<div className="search-bx mx-5">
			<form>
				<div className="input-group">
					<input
						type="search"
						className="form-control"
						placeholder="Search"
						aria-label="Search"
						aria-describedby="button-addon3"
					/>
					<div className="input-group-append">
						<button className="btn" type="submit" id="button-addon3">
							<i data-feather="search"></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
