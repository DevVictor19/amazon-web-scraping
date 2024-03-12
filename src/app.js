import express from "express";
import { scrapeController } from "./controllers/scrape.controller.js";

export const app = express();

app.use("/", express.static("public"));

app.use("/api/scrape", async (req, res) => {
  await scrapeController(req, res);
});

// test aaaaaaaaaaaaaaaa  asdasdas aaaaa
