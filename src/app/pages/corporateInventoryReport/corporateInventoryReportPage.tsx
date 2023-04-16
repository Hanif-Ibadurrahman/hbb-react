import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const CorporateInventoryReportPage = lazyLoad(
	() => import("app/pages/corporateInventoryReport"),
	undefined,
	{ fallback: <Loading /> },
);
