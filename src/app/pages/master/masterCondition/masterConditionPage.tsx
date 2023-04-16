import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterConditionPage = lazyLoad(
	() => import("app/pages/master/masterCondition"),
	undefined,
	{ fallback: <Loading /> },
);
