const express = require("express");
const checkSite = require("./checksite");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

const sites = [
  // {
  //   url:
  //     "https://www.amazon.de/Sony-Interactive-Entertainment-PlayStation-5/dp/B08H93ZRK9/",
  //   title: "Amazon.de",
  //   changeTrigger: "Derzeit nicht verfügbar",
  //   changed: false,
  // },
  // {
  //   url:
  //     "https://www.amazon.fr/PlayStation-%C3%89dition-Standard-DualSense-Couleur/dp/B08H93ZRK9",
  //   title: "Amazon.fr",
  //   changeTrigger: "Actuellement indisponible",
  //   changed: false,
  // },
  // {
  //   url:
  //     "https://www.amazon.nl/Sony-PlayStation-PlayStation%C2%AE5-Console/dp/B08H93ZRK9/",
  //   title: "Amazon.nl",
  //   changeTrigger: "Momenteel niet verkrijgbaar",
  //   changed: false,
  // },
  {
    url: "https://www.fun.be/ps5-console-1.html",
    title: "Fun",
    changeTrigger: "Niet in voorraad",
    changed: false,
  },
  {
    url:
      "https://www.bol.com/nl/p/sony-playstation-5-console/9300000004162282/",
    title: "Bol.com",
    changeTrigger: "Niet leverbaar",
    changed: false,
  },
];

io.on("connection", (socket) => {
  socket.emit("list", sites);
});

const interval = 0.5 * 60000;

setInterval(() => {
  sites.forEach((site) => {
    checkSite(site, io);
  });
}, interval);

server.listen(3000);
