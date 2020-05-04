const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
 

const app = express();

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get("port") || 5000;

async function start() {
  try {
    //connect возвращает промис 
    await mongoose.connect(config.get("mongoUri"), {  
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
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
