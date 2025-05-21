require("dotenv").config();

const express = require('express')
const packageJSON = require("./package.json");
const cors = require("cors");
const app = express()
const port = process.env.API_PORT;

const db_mysql = require("./models");
db_mysql.sequelize.sync();

const userRoute = require("./routers/UserRoutes");
const messengerRoute = require("./routers/MessengerRoute");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('index', { title: 'Middleware Backend PWL version ' + packageJSON.version });
});

app.use("/api/user", userRoute);
app.use("/api/msg", messengerRoute);


app.listen(port, () => {
  console.log(`Server app listening on http://localhost:${port}`);
});
