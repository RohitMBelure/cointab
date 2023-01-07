const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");
const { usersRouter } = require("./Routes/users.route");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to backend of cointab assignment");
});
app.use("/users", usersRouter);

app.listen(PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connecting to db successful");
  } catch (err) {
    console.log("Error connecting to db");
    console.log(err);
  }
  console.log(`Listening to PORT ${PORT}`);
});
