#!/usr/bin/env node

const {
  parsed: { port },
} = require("dotenv").config();

const http = require("http");
const express = require("express");
const app = express();
const path = require("path");

// const server = http.Server(app);
const server = http.createServer(app);

const dist = path.join(process.cwd(), "dist");
app.use(express.static(dist));

// require("./api/twitter").getFavs().map(({ id, retweet_count:rts, favorite_count:favs }) => {id, rts, favs})
require("./client-dipatch")(app);

server.listen(`${port}`, () => console.log(`port ${port}`));