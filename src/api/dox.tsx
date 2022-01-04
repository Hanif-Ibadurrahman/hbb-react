import axios from "axios";

const token =
	"Y2t4em53ZW1sMDAwNDRsbzEzazQ1Ym0yNQ.UepOZuPDzVYv3fO6miktmPKG1C-pfM24qYZe1n19UdSatDrqDkvR1E2DLqj6";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
