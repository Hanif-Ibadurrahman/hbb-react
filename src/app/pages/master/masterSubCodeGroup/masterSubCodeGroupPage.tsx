import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterSubCodeGroupPage = lazyLoad(
	() => import("app/pages/master/masterSubCodeGroup"),
	undefined,
	{ fallback: <Loading /> },
);
