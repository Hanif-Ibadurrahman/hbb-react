import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterCodeGroupPage = lazyLoad(
	() => import("app/pages/master/masterCodeGroup"),
	undefined,
	{ fallback: <Loading /> },
);
