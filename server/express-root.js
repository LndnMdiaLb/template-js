#!/usr/bin/env node

// const   { parsed: { port } } = require('dotenv').config() ;

const http = require("http")
const express = require("express");

const app = express();
const server = http.createServer(app);
app.use(express.static("dist"));
const port = process.env.npm_package_config_server;
server.listen(`${port}`, () => console.log(`port ${port}`));

/* 
    websocket server attaches to http server 
*/

const { Server: WSServer } = require("ws");
const wss = new WSServer({ server });
wss.on("connection", (websocket)=>{
  // await client
  websocket.on('message', (message)=>{
    // client loaded and has created a websocket to location.host
    websocket.send(`${message}:ServerA)`)
  })
});
