import axios from "axios";

const token =
	"Y2t4aXpzZjl1MDAwazRsbzg2azhwZW1kOQ.JuneZ6SiwUoY42OwfUSBuJVbKwLgRKdfutXZmx--3MuLsM9mIT4l8oGbJi7n";

export default axios.create({
	baseURL: "http://103.93.57.36:8008",
	headers: { Authorization: "Bearer " + token },
});
