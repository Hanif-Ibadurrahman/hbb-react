import { Loading } from "app/components/loading";
import { lazyLoad } from "utils/loadable";

export const MasterWorkflowPage = lazyLoad(
	() => import("app/pages/master/masterWorkflow"),
	undefined,
	{ fallback: <Loading /> },
);
