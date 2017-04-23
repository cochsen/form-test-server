var http = require('http');
var formidable = require("formidable");
var util = require('util');

var server = http.createServer(function (req, res) {
    // Allow two servers on localhost
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    if (req.method.toLowerCase() == 'post') {   // handles any post action
        processForm(req, res);
        return;
    }

    // send some data for the select field
    if (req.method.toLowerCase() == 'get') {    // handles any get action
        var data = {
            data: {
                languages: [
                    'English',
                    'Spanish',
                    'German',
                    'Other'
                ]
            }
        };

        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log('get: ', responseData);
        return;
    }

    res.end();
});

var id = 1; 


function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        fields.id = id; // return arbitrary id

        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        
        var data = JSON.stringify({
            data: fields
        });

        res.end(data);

        console.log('posted fields:\n');
        console.log(data);

        id++;
    });
}

var port = 3100;
server.listen(port);
console.log("server listening on port " + port);