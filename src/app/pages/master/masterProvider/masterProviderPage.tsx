import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterProviderPage = lazyLoad(
	() => import("app/pages/master/masterProvider"),
	undefined,
	{ fallback: <Loading /> },
);
