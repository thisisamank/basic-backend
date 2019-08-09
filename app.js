const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

require("./models/Users");

require("./config/passport")(passport);
app.use(cookieParser());
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

const authRoutes = require("./routes/AuthRoutes");
const keys = require("./config/keys");

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;


mongoose.Promise = global.Promise;
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

//Authentication Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("OK!");
});

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
