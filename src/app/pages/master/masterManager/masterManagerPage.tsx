import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterManagerPage = lazyLoad(
	() => import("app/pages/master/masterManager"),
	undefined,
	{ fallback: <Loading /> },
);
