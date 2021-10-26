const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const frontDir = path.join(__dirname, "./build");

let crawler;
const getCrawler = async () => {
  if (!crawler) crawler = await require("./backend/Crawler").getInstance();
  return crawler;
};
getCrawler();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(frontDir));
app.get("/", (_, res) => {
  res.sendFile(path.join(frontDir, "index.html"));
});
app.post("/api", async (req, res) => {
  console.log("request");
  const crawler = await getCrawler();
  const rst = await crawler.getData(
    req.body.hallNumber,
    req.body.weekDay,
    req.body.options
  );
  res.send(rst);
});

app.listen(port);
