const express = require('express');
const app = express();
const funcionarioRouter = require('./routes/funcionarioRouter');
const clienteRouter = require("./routes/clienteRouter");
const PremioRouter = require("./routes/PremioRouter");
const cors = require("cors");
const loginRouter = require("./routes/loginRouter");
const db = require("./models/index");

const port = 3000;

const allowedOrigin = "https://guisoares28.github.io"; 

app.use(cors({
  origin: allowedOrigin,       
  methods: ["GET","POST", "PUT", "DELETE"]  ,
  allowedHeaders: ["Content-Type"],
  credentials: true         
}));

app.options("*", cors({
  origin: allowedOrigin,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use("/funcionario", funcionarioRouter);
app.use("/cliente", clienteRouter);
app.use("/premio", PremioRouter);
app.use("/login", loginRouter);

 
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await db.sequelize.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})

module.exports = app