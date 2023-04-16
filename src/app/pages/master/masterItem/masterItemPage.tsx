import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterItemPage = lazyLoad(
	() => import("app/pages/master/masterItem"),
	undefined,
	{ fallback: <Loading /> },
);
