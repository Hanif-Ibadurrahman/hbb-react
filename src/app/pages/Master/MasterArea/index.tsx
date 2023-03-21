import { TablePaginateAndSort } from "app/components/Table/Antd/TablePaginate";
import { MainLayout } from "app/layout/MainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/Table/ColumnAndDataType";
import { PaginationState } from "store/Types/PaginationTypes";

const MasterArea = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nama_area: "Balikpapan",
				daerah: "Balikpapan",
				pengelola: "Hendra Frayudi",
				nipg: "nipg",
				pemegang: "Andaya Endy Saputra",
				bisnis_unit: `Bisnis Unit ${i}`,
			});
		}
		setFetchData({
			total: 100,
			per_page: 10,
			current_page: 1,
			last_page: 10,
			first_page_url: "",
			last_page_url: "",
			next_page_url: "",
			prev_page_url: "",
			path: "",
			from: 1,
			to: 10,
			data: data,
		});
	}, []);

	return (
		<MainLayout>
			<section className="content">
				<div className="row">
					<div className="col-12">
						<TablePaginateAndSort
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

export default MasterArea;
