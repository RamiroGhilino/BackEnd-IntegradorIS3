const express = require('express');
const app = express();
const port = 5050;

app.use(express.json());

let count = 0;

app.get('/add', (req, res) => {
    count++;
    res.send({'value': count})
})

app.get('/sub', (req, res) => {
    count--;
    res.send({'value': count})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})