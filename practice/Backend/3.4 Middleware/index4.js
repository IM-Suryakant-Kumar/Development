import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
  const {street, pet} = req.body;
  res.send(`<h1>Your brand name is: </h1><h2>${street + pet}</h2>`)
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
