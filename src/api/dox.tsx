import axios from "axios";

const token =
	"Y2t4em9tMDVzMDAwNTRsbzEwZzUxMmJmaQ.v9A-opNROvfkXyVfsOdvy1VqzBrIkq2GBMfuEISypcDvmPy4Qz_IhOIVqZJD";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
