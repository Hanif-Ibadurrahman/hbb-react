import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const HbbInventoryReportPage = lazyLoad(
	() => import("app/pages/hbbInventoryReport"),
	undefined,
	{ fallback: <Loading /> },
);
