const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics/:characterId", async (req, res) => {
  try {
    console.log("W E L C O M E 3");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//E_X_P_O_R_T\\
module.exports = router;
