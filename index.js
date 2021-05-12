require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const axios = require("axios");

const cors = require("cors");
//______________________________________________\\

const app = express();
app.use(cors());
app.use(formidable());

//////_C.O.N.F.I.G_\\\\\\

//______________________________________________\\
//-----//_I_M_P_O_R_T_-__R_O_U_T_E_S______\\\\\\\\\\\\\\\\\\\\
// const userRoutes = require("./routes/user");
// const offerRoutes = require("./routes/offer");
// //-\\
// app.use(userRoutes);
// app.use(offerRoutes);
//_______________________________________________\\

//____H_O_M_E___Route__\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/", async (req, res) => {
  try {
    console.log("dans home");
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
///////////>>>>>>>>>>>>>><<<<<<<<<<<<<<<////////////

//ALL ROUTE & SERVER PORT\\\\\\\\_________________________\\\\\\\\\
app.all("*", (req, res) => {
  res.status(404).json({ error: "None existing route" });
});

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log("Server Launched");
});
///////////>>>>>>>>>>>>>><<<<<<<<<<<<<<<////////////
