import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const PrintBarcodePage = lazyLoad(
	() => import("app/pages/printBarcode"),
	undefined,
	{ fallback: <Loading /> },
);
