const express = require('express');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');


const app = express();

app.use(bodyParser.json());


app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);


module.exports = app;