const axios = require("axios");
const { configDotenv } = require("dotenv");
const fs = require("fs").promises;
configDotenv();

exports.getAuthToken = async () => {
  const API_AUTH = "https://api.gumart.click/api/login";

  try {
    const data = await fs.readFile("configs/config.json", "utf-8");
    const tokens = JSON.parse(data);
    const authToken = [];

    for (const token of tokens) {
      try {
        const response = await axios.post(API_AUTH, {
          telegram_data: token.token,
          ref_id: "",
        });

        const auth = response.data.data.access_token;
        authToken.push({ token: auth });
      } catch (error) {
        console.log(
          `[ Error ] : Token not valid. Response code : ${error.response.status} `
        );
      }
    }
    return authToken;
  } catch (error) {
    console.log(error.message);
  }
};
