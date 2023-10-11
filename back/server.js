require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const { Server } = require("http");
const router = require("./routes");

const PORT = process.env.SERVER_PORT;
const app = express();
const http = Server(app);
const HOST = "127.0.0.1";

app.use(express.json());
app.use("/api", router);
app.use(cookieParser());

http.listen(PORT, HOST, () => {
  console.log(`${PORT}포트에 접속하였습니다.`);
});
