var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 

app.use(bodyParser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'yszrqhmmipj7fikl@ethereal.email',
        pass: 'zFahHyDEg7kdXUMncP'
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.post('/test', function (req, res) {
    console.log(req.body.email)
    var mailOptions = {
        from: req.body.email, // sender address
        to: "apropas@gmail.com", // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.text, // plain text body
    }
    transporter.sendMail(mailOptions, function (err, info) {
        console.log("err", err)
        console.log("info", info)
    })
    res.redirect("/")
});
app.listen(8000, function () {
    console.log("listening on port 8000");
})