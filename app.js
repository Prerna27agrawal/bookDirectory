const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5050;

app.use(bodyParser.json());
app.use(require("./routes/api_routes.js"));
app.listen(PORT, () => console.log("Server is running on Port: "+ PORT));