 const express = require('express');


const app = express();




app.get("/api/", async (req, res) => {
  console.log("received");
  res.send("received");
});


app.listen(3000, () => console.log("Listening on port 3000"));
