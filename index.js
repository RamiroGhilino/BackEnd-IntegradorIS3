const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = 5050;

const add = require("./funciones/add");
const sub = require("./funciones/sub");
const restart = require("./funciones/restart");

dotenv.config();

// Redis setup
const redis = require("redis");

//6379 es el puerto al que va a buscar la base de datos, usualmente esa es por defecto pero la aclaro por si acaso
console.log(process.env.REDIS_URL);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// intentar conexion
(async () => {
  await redisClient.connect();
})();

console.log("Connecting to the Redis");

redisClient.on("ready", () => {
  console.log("Connected!");
});

redisClient.on("error", (err) => {
  console.log("Error in the Connection");
});

app.use(express.json());

//cors enable
var cors = require('cors');
var corsOptions = {
  origin: "https://frontend-production-0c0f.up.railway.app"
};
app.use(cors(corsOptions));

let count = 0;

app.get("/", async (req, res) => {
  //console.log("Este cambio se hizo con github actions");
  let count = await redisClient.get("count");
  if (count === null) {
    await redisClient.set("count", 0);
    res.send({ value: 0 });
    return;
  }
  console.log(count);
  res.send({ value: count });
});

app.get("/add", async (req, res) => {
  let count = await redisClient.get("count");
  if (count === null) {
    await redisClient.set("count", 1);
    res.send({ value: 1 });
    return;
  }
  console.log(count);
  count = add(parseInt(count));
  await redisClient.set("count", count);
  res.send({ value: count });
});

app.get("/sub", async (req, res) => {
  let count = await redisClient.get("count");
  if (count === null) {
    await redisClient.set("count", -1);
    res.send({ value: -1 });
    return;
  }
  console.log(count);
  count = sub(parseInt(count));
  await redisClient.set("count", count);
  res.send({ value: count });
});

app.get("/restart", async (req, res) => {
  let count = await redisClient.get("count");
  if (count === null) {
    await redisClient.set("count", 0);
    res.send({ value: 0 });
    return;
  }
  console.log(count);
  count = restart();
  await redisClient.set("count", count);
  res.send({ value: count });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


module.exports = { 
  add, sub, restart
}