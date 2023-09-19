// TODO
/* Add .env file to store secret keys **
 * Project File Restructure: (Views, Routes)  **
 * Create register and login page **
 * Store users in the database **
 * Store user session **
 * 
 * Github OAuth (final)
 */

require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const cookie = require("cookie-session");
const authRoute = require("./auth/authenticated");
const nonAuthRoute = require("./auth/non_authenticated");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cookie({
    secret: process.env.SESSION_ID,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

function authNavigator(req, _, next) {
  if (req.session.login === true) {
    app.use(authRoute);
    console.log(`${req.url} using auth`);
    next();
  } else {
    app.use(nonAuthRoute);
    console.log(`${req.url} using non-auth`);
    next();
  }
}

app.use(authNavigator);

app.listen(process.env.PORT, () => console.log("Server has started on port 3000"));