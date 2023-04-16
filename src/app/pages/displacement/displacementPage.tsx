import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const DisplacementPage = lazyLoad(
	() => import("app/pages/displacement"),
	undefined,
	{ fallback: <Loading /> },
);
