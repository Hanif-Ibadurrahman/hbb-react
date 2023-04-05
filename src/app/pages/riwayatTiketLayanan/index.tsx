import { TablePaginateAndSort } from "app/components/table/antd/tablePaginateAndSort";
import { MainLayout } from "app/layout/mainLayout";
import { useEffect, useState } from "react";
import { IDataType, columns } from "./components/table/columnAndDataType";
import { PaginationState } from "store/types/paginationTypes";
import { SideModal } from "app/components/modal/SideModal";
import { SelectWithTag } from "app/components/selectWithTag";
import { DatePicker } from "antd";

const RiwayatTiketLayanan = () => {
	const [, setSelectedPage] = useState<number>(1);
	const [fetchData, setFetchData] = useState<PaginationState>();
	const { RangePicker } = DatePicker;

	useEffect(() => {
		let data: IDataType[] = [];
		for (let i = 0; i < 100; i++) {
			data.push({
				nomor: `0701920011`,
				tanggal: `29 January 2023`,
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
							title="Riwayat"
							dataSource={fetchData}
							columns={columns}
							setSelectedPage={setSelectedPage}
						/>
					</div>
				</div>
			</section>

			<SideModal
				title="Filter"
				contentFooter={
					<button
						type="button"
						className="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Filter
					</button>
				}
			>
				<h6 className="box-title mt-10 d-block mb-10">Nomor</h6>
				<SelectWithTag colorTag="cyan" />
				<h6 className="box-title mt-10 d-block mb-10">Nomor</h6>
				<RangePicker style={{ width: "100%" }} />
			</SideModal>
		</MainLayout>
	);
};

export default RiwayatTiketLayanan;
