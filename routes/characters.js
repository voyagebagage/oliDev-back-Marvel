const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    // const title = req.query.title || "";

    console.log("W E L C O M E2222");

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}`
    );
    // const data = response.data.results.slice(skip, limit);
    // console.log(response.data);

    // let returnTab = [];

    // if (title) {
    //   const accumulatedData = [];

    //   for (let i = 0; i <= 15; i++) {
    //     const response = await axios.get(
    //       `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
    //         process.env.API_KEY
    //       }&limit=${limit + 100 * i}&skip=${skip + 100 * i}&title=${title}`
    //     );
    //     accumulatedData.push(response.data.results);
    //     // const element = array[i];

    //     let eSplitted = title.toString().split(" "); //in case of more than one word in searchBar(query name) in one array
    //     // console.log(response.data.results);
    //     for (let i = 0; i < eSplitted.length; i++) {
    //       //   //query
    //       matchesName = accumulatedData.filter((searchWord) => {
    //         let rgx = new RegExp(eSplitted[i], "i"); //regex insensitive to case
    //         if (searchWord.name) {
    //           return searchWord.name.match(rgx);
    //           //filtering and collecting on description & name keys
    //         }
    //       });
    //     }
    //     // console.log(matchesName.name);
    //     for (let k = 0; k < matchesName.length; k++) {
    //       console.log(matchesName[k].name);
    //       returnTab.push(matchesName[k]); //format as expected on the output
    //       // console.log(returnTab);
    //     }
    //   }
    // return returnTab;
    // }

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//E_X_P_O_R_T\\
module.exports = router;
