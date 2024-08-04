const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { validateToken } = require("./func/CheckValidToken");
const { startBoost } = require("./func/startBoost");
configDotenv();
// Schedule the task to run every hour on the hour

// cron.schedule("0 0 * * *", DailyRewards);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  startBoost();
  console.log(`Server is running on port ${port}`);
});
