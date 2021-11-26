import axios from "axios";

const token =
	"Y2t3Z2RyYjc4MDAwMjRscGUzNm5kMGl4YQ.LpqeC4pCVKRYg5rTChE54K9eoDVf3PhmJbZQArxzouIeEOnHjR1V28SN8EQG";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
