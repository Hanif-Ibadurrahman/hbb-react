import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterDivisionPage = lazyLoad(
	() => import("app/pages/master/masterDivision"),
	undefined,
	{ fallback: <Loading /> },
);
