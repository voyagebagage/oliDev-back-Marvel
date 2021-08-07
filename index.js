require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
//______________________________________________\\

const app = express();
app.use(formidable());
app.use(cors());

//////_C.O.N.F.I.G_\\\\\\

//______________________________________________\\
//-----//_I_M_P_O_R_T_-__R_O_U_T_E_S______\\\\\\\\\\\\\\\\\\\\
const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const searchRoutes = require("./routes/search");
// //-\\
app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(searchRoutes);
//_______________________________________________\\

//____H_O_M_E___Route__\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my Marvel API" });
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
