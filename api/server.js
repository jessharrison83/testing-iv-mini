const express = require("express");

const hobbits = require("../hobbits/hobbitsModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", async (req, res) => {
  const rows = await hobbits.getAll();

  res.status(200).json(rows);
});

server.post("/hobbits", (req, res) => {
  const newHobbit = req.body;
  hobbits
    .insert(newHobbit)
    .then(response => {
      if (newHobbit.name) {
        response.status(200).json({ message: "hobbit added" });
      } else {
        console.log(newHobbit);
        res.status(400).send("add failed");
      }
    })
    .catch(err => {
      res.status(400).send("add failed");
    });
});

module.exports = server;
