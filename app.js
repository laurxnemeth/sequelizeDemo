const express = require("express");
const morgan = require("morgan");
const app = express();
const router = require("./routes");
const PORT = 3000;

app.use(morgan("dev"));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
	res.send("Welcome to ~Insert Generic Car Ride Share App~");
});

//error handling???
// 500 errors
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send(err.message);
});

// 404 errors
app.use((req, res, next) => {
	res.status(404).send("Endpoint is not supported by app!");
});

app.listen(PORT, () => {
	console.log(`Server has started on port http://localhost:${PORT}...`);
});
