import axios from "axios";

const token =
	"Y2t3b3FsaDZqMDAwMzVqcGs1d3lhNjdrbg.KvN2WuotOH0HPfs_NZHsSZVArcG20QETG1rDidTfZQCQLxsyP82uixBOBHf9";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
