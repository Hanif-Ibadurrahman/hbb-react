import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterAreaPage = lazyLoad(
	() => import("app/pages/master/masterArea"),
	undefined,
	{ fallback: <Loading /> },
);
