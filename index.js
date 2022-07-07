// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // convert date to unix
    const unix = new Date(date).getTime();
    // convert date to utc
    const utc = new Date(date).toUTCString();
    res.json({ unix, utc });
  } else if (!isNaN(date)) {
    // convert unix to date
    const newDate = new Date(parseInt(date));
    const utc = newDate.toUTCString();
    const unix = newDate.getTime();
    res.json({ unix, utc });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
