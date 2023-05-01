import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterWorkflow
		? () => import("app/pages/master/masterWorkflow")
		: () => import("app/pages/error/notFound");
};

export const MasterWorkflowPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
