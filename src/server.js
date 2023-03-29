import express from "express";
import { BUILD_PATH } from "./config.js";

const app = express();
const port = 3000;

app.use(express.static(BUILD_PATH));

app.listen(port, () => {
  console.log("Ready in http://localhost:3000");
});
