const express = require("express");
const app = express();
const port = 3000;
const MainRoutes = require("./routes/MainRoutes");
const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const session = require("express-session");
const validator = require("./middleware/validator");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", require("express-ejs-extend"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000, // 1 menit = 60 detik = 60000 milliseconds
    },
  })
);

app.use("/", MainRoutes);
app.use("/users", userRoutes);
app.use("/stores", storeRoutes);
app.use("/products", validator("checkHasLogin"), productRoutes);
app.use("/orders", validator("checkHasLogin"), orderRoutes);

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);
