const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Binance = require('node-binance-api');
require('dotenv').config();

const binance = new Binance().options({
    APIKEY: process.env.APIKEY,
    APISECRET: process.env.APISECRET
  });

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET"]
    }
  });
  

io.on("connection", (socket) => {
    binance.bookTickers('BTCUSDT', (error, ticker) => {
         socket.emit('api',ticker) 
    })})


httpServer.listen(8080);