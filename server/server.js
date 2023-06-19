const express = require("express");
const app = express();
const test = require("./Router/test");
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", test);

const port = 8000; // 사용 포트번호
app.listen(port, () => console.log(`${port}`));

