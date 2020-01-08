var express = require("express");
var app = express();
var Flickr = require('flickr-sdk');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    var flickr = new Flickr('17d3405001351c2a599cd5875c1b5250');
    flickr.photos.search({
        text: req.query.q,
        per_page: '300'
    }).then(function (response) {
        res.status(200).send(response.body.photos.photo);
    }).catch(function (err) {
        console.error('bonk', err);
    });
});
// Create a Server
var server = app.listen(5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("App listening at http://%s:%s", host, port)
})


