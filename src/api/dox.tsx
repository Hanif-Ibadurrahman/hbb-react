import axios from "axios";

const token =
	"Y2t4aDd6cmJ5MDAwMjRsbzg5N2UyM3k5dA.BHA3StlCTp403Fo7boXjNwTfTM31dxDWMEwaFeoK6cWxyRXpWdvMVC3RlIfl";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
