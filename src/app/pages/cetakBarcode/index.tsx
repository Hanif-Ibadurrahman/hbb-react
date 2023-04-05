import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { PaginationState } from "store/types/paginationTypes";

const CetakBarcode = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				area: `Area ${i}`,
				daerah: `Balikpapan`,
			});
		}
		// setFetchData({
		// 	total: 100,
		// 	per_page: 10,
		// 	current_page: 1,
		// 	last_page: 10,
		// 	first_page_url: "",
		// 	last_page_url: "",
		// 	next_page_url: "",
		// 	prev_page_url: "",
		// 	path: "",
		// 	from: 1,
		// 	to: 10,
		// 	data: data,
		// });
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
							title="Daftar Area"
							dataSource={fetchData}
							columns={columns}
							setSelectedPage={setSelectedPage}
						/>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default CetakBarcode;
