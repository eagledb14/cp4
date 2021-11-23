const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongo://localhost:27107/something', {
  useNewUrlParser: true;
});

const creatureSchema = new mongoose.Schema({
  name: String
  description: String,
	path: String,
  strength: int,
	win: int,
	loss: int
});

const creature = new newSchema()

app.get("/api/", async (req, res) => {
  res.send("received");
});


app.listen(3000, () => console.log("Listening on port 3000"));
