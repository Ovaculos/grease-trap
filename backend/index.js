const express = require("express");
const app = express();
const host = "localhost";
const port = "8080";

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("yeeeeeeeeee");
});

app.listen(port, host, () => {
  console.log(`App is listening on port ${port} of ${host}!`);
});
