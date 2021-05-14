const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectToMongo = require("./services/mongo");

/* --- Routers --- */
// should make an index.js for mulitple consts
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const authenticateRouter = require("./routes/authenticate");
const todosRouter = require("./routes/todos");

const app = express();

//Services
require("dotenv").config();
require("./services/passport")(app); //Initialize passport using app as an argument
connectToMongo();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/authenticate", authenticateRouter);
app.use("/todos", todosRouter);

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.json({
    error,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 3001}`);
});

module.exports = app;
