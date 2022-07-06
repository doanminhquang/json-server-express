const express = require("express");
const server = express();
const jsonServer = require("json-server");
const middlewares = require("json-server-auth");
const db_file_name = "db.json";
const router = jsonServer.router(db_file_name);
const morgan = require("morgan");
const db = require(`./${db_file_name}`);
/*
const rules = auth.rewriter({
  // Permission rules
  users: 600,
  messages: 640,
  // Other rules
  "/posts/:category": "/posts?category=:category",
});
*/

server.db = router.db;

//server.use(jsonServer.bodyParser);
server.use(morgan("tiny"));

server.use("/assets", express.static(__dirname + "/assets"));
server.use(
  "/",
  express.static(__dirname + "/node_modules/json-server/public/")
);
//server.use(rules);
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log("\nResources\n");
  if (db)
    Object.keys(db).map((item) =>
      console.log(`http://localhost:${PORT}/${item}` + "\n")
    );
  console.log("Home\n" + `http://localhost:${PORT}`);
});
