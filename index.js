const https = require('https');
var libxmljs = require("libxmljs");

https.get('https://ghibliapi.herokuapp.com/films', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            console.log(json)

        }
        catch (error) {
            console.error(error.message);
        };
    })

}).on('error', (e) => {
  console.error(e);
});



/*
var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
           '<root>' +
               '<child foo="bar">' +
                   '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
               '</child>' +
               '<sibling>with content!</sibling>' +
           '</root>';
 
var xmlDoc = libxmljs.parseXml(xml);
 
// xpath queries
var gchild = xmlDoc.get('//grandchild');
 
console.log(gchild.text());  // prints "grandchild content"
 
var children = xmlDoc.root().childNodes();
var child = children[0];
 
console.log(child.attr('foo').value());
*/