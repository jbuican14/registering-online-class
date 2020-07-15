"use strict";

const express       = require("express");
const nodemailer    = require("nodemailer");
const path          = require("path");
const { info }      = require("console");
const application   = express();

application.use(express.json());
application.use(express.urlencoded({
    extended: false
}));

application.set("views", path.join(__dirname, "views"));
application.set("view engine", "jade");

application.use(express.static(path.join(__dirname, 'public'))); 

application.get("/", (req, res) => {
    res.render('index', {title: "Welcome"});
});
application.get("/about", function(req, res){
    res.render("about");
});
application.get("/contact", function(req, res){
    res.render("contact");
});
application.post("/contact/send", function(req, res){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secureConnection: false,// true for 465, false for other ports
        auth: {
            user: "[EMAIL@GMAIL.COM]",
            pass: "[PASSWORD]", 
        },
    });

    var mailConfig = {
        from: "Class Support <classsupport@gmail.com",
        to: "[EMAIL]@gmail.com",
        subject : "Thank you for contacting us",
        text: "You contact us with the following message : " + req.body.message,
        html: "<p>You contact us with the following message :</p> <p>" + req.body.message + "</p>"
    };
    let info = transporter.sendMail(mailConfig, (err, info) => {
        if(err) {
            console.log(err);
            res.redirect("/contact");
        }else{
            console.log("Message sent" + info.response);  
            res.redirect("/");      
        }
    });
});
application.get("/classes", function(req, res){
    res.render("classes");
});


application.set("port", process.env.PORT || 3002)
            .listen(application.get("port"), ()=> {
    console.log(`Server runs at http://localhost:${application.get("port")}`);
})