const { sequelize, initDB } = require("./src/entity");
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./src/route");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

initDB().then(() => {
    console.log("Database initialized and tables created!");

    app.use(route);
});

module.exports = app;
