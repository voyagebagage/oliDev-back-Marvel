const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search-character", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip;
    const name = req.query.name;

    console.log("search | | | |");

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.log("search marvel issue");
    res.status(400).json({ error: error.message });
  }
});
//E_X_P_O_R_T\\
module.exports = router;
