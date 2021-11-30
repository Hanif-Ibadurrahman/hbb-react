import axios from "axios";

const token =
	"Y2t3bHZzYWJ3MDAwMDVqbzA3eXgwNmFieg.ST7hKZXjkEteqIb0W66YUopSD-IOI4ggfRuPZwzlSwFhN8HVilMWAEiVOLMp";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
