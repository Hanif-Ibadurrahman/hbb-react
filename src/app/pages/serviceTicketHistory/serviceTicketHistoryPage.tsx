import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const ServiceTicketHistoryPage = lazyLoad(
	() => import("app/pages/serviceTicketHistory"),
	undefined,
	{ fallback: <Loading /> },
);
