const express = require("express");
const path = require("path");
const config = require("config");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === 'production') {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//const PORT = config.get("port") || 5000;
const PORT = process.env.port || 5000;

async function start() {
  try {
    //connect возвращает промис
    //await mongoose.connect(config.get("mongoUri"), {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1); //завершить, если ошибка /code:1
  }
}

start();
