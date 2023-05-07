const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vincentradet:H4iBV0jQEqCtBnQf@clusterreact18.egkghqt.mongodb.net/r18c20prod?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("CONNEXION DB OK");
  })
  .catch((e) => {
    console.log(e);
  });
const app = express();
app.use(express.static(`${__dirname}/../client/build`));
app.listen(80);
