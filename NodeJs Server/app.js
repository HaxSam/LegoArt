const express = require("express");
const net = require("net");
const os = require("os");
const bodyParser = require("body-parser");
const path = require("path");
const engine = require("consolidate");

let app = express()
let client = new net.Socket();

ip = ["192.168.0.188", "192.168.0.2", "192.168.4.1", "127.0.0.1"]

client.connect(3000, ip[2], () => {
  console.log("Socket connection to ESP is running!!")
})

// while (true) {
//   try {
//     client.connect(3000, "127.0.0.1", () => {
//       console.log("Socket connection to ESP is running!!")
//     })
//     break;
//   } catch (err) {
//     i++
//   }
// }


app.engine("html", engine.mustache);
app.set("view engine", "html");
app.set("views", path.join(__dirname + "/views"));

app.use("/", express.static(__dirname + "/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.render("index.html");
})

app.post("/", (req, res) => {
  data = req.body.data;
  console.log(data)
  let buffer = Buffer.allocUnsafe(25);
  for (let i = 0; i < buffer.length; i++) {
    buffer.writeUInt8(parseInt(data[i]), i);
  }

  client.write(buffer)
})

app.listen("80", () => {
  console.log("Server läuft auf " + os.hostname().toLowerCase() + ".local/");
})