"use strict";

const express = require("express");
const path  = require("path");
const nodemailer = require("nodemailer");

const application = express();
application.use(express.json());
application.use(express.urlencoded({
    extended: falses
}));
application.set("port", process.env.PORT || 3002);
application.listen(application.get("port"), ()=> {
    console.log(`Server runs at http://localhost:${application.get("port")}`);
})