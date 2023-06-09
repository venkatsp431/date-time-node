const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const dirName = path.join(__dirname, "timeStamp");

app.get("/", (req, res) => {
  res.send("Server created Successfully");
});

app.get("/datetime", (req, res) => {
  const currentDate = new Date();
  const stdTime = currentDate.toUTCString().slice(0, -3);
  const content = `Current date and time is ${stdTime}`;
  const fileName = stdTime.replaceAll(":", "-");
  fs.writeFile(`${dirName}/${fileName}.txt`, content, (err) => {
    if (err) {
      res.send(err);
      return;
    }
    res.sendFile(path.join(dirName, `${fileName}.txt`));
  });
});

app.listen(9000, () => console.log("Server Running in localhost:9000"));
