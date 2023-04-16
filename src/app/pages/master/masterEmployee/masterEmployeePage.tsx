import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterEmployeePage = lazyLoad(
	() => import("app/pages/master/masterEmployee"),
	undefined,
	{ fallback: <Loading /> },
);
