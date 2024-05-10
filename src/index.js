const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { sessionModel } = new PrismaClient();
const prisma = new PrismaClient();

const {
  authBaseURI,
  usersBaseURI,
  rolesBaseURI,
  housesBaseURI,
  tenantsBaseURI,
  landLordBaseURI,
  BailBaseURI,
  payementBaseURI,
} = require("./config/paths.js");

const {
  authRouter,
  roleRouter,
  userRouter,
  houseRouter,
  tenantRouter,
  landLordRouter,
  bailRouter,
  payementRouter,
} = require("./routes/index.js");

const app = express();
const PORT = 3000;

// config cors
const allowedOrigins = ["https://carnet-de-loyer-lime.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Non autorisé par CORS"));
    }
  },
  credentials: true,
};

// Config
app.use(json());
app.use(cors(corsOptions));

// const data = require("./utils/data.json");

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     " X-access-token, Origin, Content-Type, Accept,"
//   );

//   next();
// });

//-----SESSION CONFIG ------

// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use(authBaseURI, authRouter);
app.use(rolesBaseURI, roleRouter);
app.use(usersBaseURI, userRouter);
app.use(housesBaseURI, houseRouter);
app.use(tenantsBaseURI, tenantRouter);
app.use(landLordBaseURI, landLordRouter);
app.use(BailBaseURI, bailRouter);
app.use(payementBaseURI, payementRouter);

app.listen(PORT, () => {
  console.log(`The server listens on http://localhost:${PORT}`);
});

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

// app.use(express.json());

// app.get("/data", (req, res) => {
//   res.send(data);
// });

// app.get("/data/my-houses", (req, res) => {
//   const pageParam = req.query.page || 1;
//   const npage = 8;

//   const startPage = (pageParam - 1) * npage;
//   const endPage = startPage + npage;
//   const housesOnPge = houses.slice(startPage, endPage);
//   res.send(housesOnPge);
// });

// app.get("/my-houses/:id", (req, res) => {
//   const { id } = req.params;

//   const house = houses.find((house) => (house.id = +id));

//   res.send(house);
// });

// // app.get("/articles/:id", (req, res) => {
// //   const { id } = req.params;

// //   const article = articles.find((article) => (article.id = +id));

// //   res.send(article);
// // });

// app.post("/my-houses", (req, res) => {
//   const newHouses = req.body;

//   houses.push(newHouses);

//   res.status(201).json({ message: "houses" });
// });

// app.get("/data/my-tenants", (req, res) => {
//   const pageParam = req.query.page || 1;
//   const npage = 8;

//   const startPage = (pageParam - 1) * npage;
//   const endPage = startPage + npage;
//   const tenantsOnPge = tenants.slice(startPage, endPage);
//   res.send(tenantsOnPge);
// });

// app.post("/my-tenants", (req, res) => {
//   const newTenants = req.body;

//   tenants.push(newTenants);

//   res.status(201).send(tenants);
// });

// app.put("/my-tenants/:id", (req, res) => {
//   const { id } = req.params;
//   const tenant = req.body;

//   const tenantIndex = tenants.findIndex((element) => element.id === +id);
//   if (tenantIndex < 0) {
//     tenants.push(tenant);
//     res.status(201).send(tenants[tenants.length - 1]);
//   } else {
//     tenants[tenantIndex] = tenant;
//     res.status(200).send(tenants[tenantIndex]);
//   }
// });

// app.put("/articles/:id", (req, res) => {
//   const { id } = req.params;

//   const article = req.body;

//   const articleIndex = articles.findIndex((article) => {
//     if (articleIndex < 0)
//       articles.push(article);
//     }
//   });
// });

// app.delete("/articles/:id", (req, res) => {
//   console.log("Hello wold !");
// });
