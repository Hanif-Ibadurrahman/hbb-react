import { Loading } from "app/components/loading";
import { listCheckPermission } from "app/helper/permission";
import { lazyLoad } from "utils/loadable";

const loadPage = () => {
	return listCheckPermission.isAllowReadMasterSatuanKerja
		? () => import("app/pages/master/masterWorkUnit")
		: () => import("app/pages/error/notFound");
};

export const MasterWorkUnitPage = lazyLoad(loadPage(), undefined, {
	fallback: <Loading />,
});
