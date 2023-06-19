const express = require("express");
const cors = require("cors");
const app = express();

var corOptions = {
  origin: "http://localhost:3000",
};

app.set("port", process.env.PORT || 8000);

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./router/TodoRouter.js");
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});