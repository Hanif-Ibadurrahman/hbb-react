import axios from "axios";

const token =
	"Y2t3bHhibnNjMDAwZDVqbzA1YzB0M2p2NQ.yEl6UkGQu1QzWaubRm0oXgk_hz9T2ElHvx2pU0eqZV6HQcCgIp0euLgz17e9";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
