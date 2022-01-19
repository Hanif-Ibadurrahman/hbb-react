import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PageWrapper } from "app/components/PageWrapper";
import { DataTable } from "app/components/Datatables";
import PageHeader from "../../Approval/Components/PageHeader";
import DropdownAction from "app/components/DropdownAction";
import { Pagination } from "app/components/Pagination";
import {
    getAllRequestList
} from "actions/RequestBoxAction";
import { useDispatch, useSelector } from "react-redux";
import { selectRequestBoxes } from "store/Selector/RequestBoxSelector";
import moment from "moment";

const RequestHistory = () => {
    const requestBoxes = useSelector(selectRequestBoxes);
    const dispatch = useDispatch();

    const FetchData = (page = 1) => {
        dispatch(getAllRequestList(page));
    };

    useEffect(() => {
        FetchData();
    }, []);

    const action = id => [
        {
            icon: "fa-search",
            title: "Detail",
            url: "DetailRequestBox/" + id,
            type: 1,
        },
    ];

    const header = [
        {
            title: "Id Request",
            prop: "id",
            cellProps: {
                style: { width: "40%" },
            },
        },
        {
            prop: 'created_at',
            sortable: true,
            cellProps: {
                style: { width: "20%" },
            },
            headerCell: (sortedProp) => {
                const isActive = sortedProp.prop === 'created_at';
                const order = sortedProp.isAscending ? 'Terlama' : 'Terbaru';

                return (
                    <div className="cur-p">
                        {`Tanggal Permintaan ${isActive ? `(${order})` : '(Inactive)'}`}
                        <i className="fas fa-sort-alt ml-2"></i>
                    </div>
                );
            },
            cell: row => {
                return moment(row.created_at).format("DD MMMM YYYY");
            },
        },
        {
            title: "Tipe Permintaan",
            prop: "type",
            cellProps: {
                style: { width: "20%" },
            },
            cell: row => {
                return (
                    <>
                        {row.type == "request-box"
                            ? "Request Box"
                            : row.type == "pickup-box"
                                ? "Pick Up Box"
                                : row.type == "borrow-item"
                                    ? "Peminjaman"
                                    : row.type == "return-item"
                                        ? "Pengembalian"
                                        : null}
                    </>
                );
            },
        },
        {
            title: "Action",
            prop: "Action",
            cellProps: {
                style: { flex: 1 },
                className: "realname-class",
            },
            cell: row => {
                return <DropdownAction list={action(row.id)} />;
            },
        },
    ];

    return (
        <>
            <Helmet>
                <title>Dox - Request Box</title>
                <meta
                    name="description"
                    content="A React Boilerplate application homepage"
                />
            </Helmet>
            <PageWrapper>
                <PageHeader breadcrumb={["Customer", "Riwayat Perminataan"]} />
                <DataTable tableHeader={header} tableBody={requestBoxes.RequestBoxes} initialSort={{ prop: 'created_at', isAscending: true }} />
                <Pagination
                    pageCount={requestBoxes.Meta.last_page}
                    onPageChange={data => FetchData(data.selected + 1)}
                />
            </PageWrapper>
        </>
    );
};

export default RequestHistory;
