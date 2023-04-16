import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterColorPage = lazyLoad(
	() => import("app/pages/master/masterColor"),
	undefined,
	{ fallback: <Loading /> },
);
