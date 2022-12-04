const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = 5050;

dotenv.config();

// Redis setup
const redis = require('redis');

//6379 es el puerto al que va a buscar la base de datos, usualmente esa es por defecto pero la aclaro por si acaso
console.log(process.env.REDIS_URL);
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

// intentar conexiÃ³n
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

let count = 0;


app.get('/', (req,res) => {
    (async () => {
        let count = await redisClient.get('count');
        if (count === null) {
            await redisClient.set('count', 0);
            res.send({'value': 0});
            return;
        }
        console.log(count);
        res.send({'value': count})
    })()
})

app.get('/add', (req, res) => {
    (async () => {
        let count = await redisClient.get('count');
        if (count === null) {
            await redisClient.set('count', 1);
            res.send({'value': 1});
            return;
        }
        console.log(count);
        count++;
        await redisClient.set('count', count);
        res.send({'value': count})
    })()
})

app.get('/sub', (req, res) => {
    (async () => {
        let count = await redisClient.get('count');
        if (count === null) {
            await redisClient.set('count', -1);
            res.send({'value': -1});
            return;
        }
        console.log(count);
        count--;
        await redisClient.set('count', count);
        res.send({'value': count})
    })()
})

app.get('/restart', (req, res) => {
    (async () => {
        let count = await redisClient.get('count');
        if (count === null) {
            await redisClient.set('count', 0);
            res.send({'value': 0});
            return;
        }
        console.log(count);
        count = 0;
        await redisClient.set('count', count);
        res.send({'value': count})
    })()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})