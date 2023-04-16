import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterUserPage = lazyLoad(
	() => import("app/pages/master/masterUser"),
	undefined,
	{ fallback: <Loading /> },
);
