import axios from "axios";

const token =
	"Y2t4eGc3eDM4MDAwMjVqbzFmZnRlYm12bQ.KFutVxLHbYABKN-muM9pdidbR4txgJWmwGmvmLRkR_f1gXtMqNvSxLE7dLDU";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
