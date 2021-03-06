const querystring = require('querystring');
const https = require('https');

var valid_user= false //boolean value to check the user is valid or not (default value false) 
/**
 * Function to find the customer identity
 * @param {string} host 
 * @param {string} type 
 * @param {string} value 
 */
function getidentity(host,type,value) {
    https.get(`https://${host}/api/rest/acs/identity/${type}.${value}`, (res) => {
        console.log('statusCode:', res.statusCode); // to see the status code
        console.log('headers:', res.headers); // to see the headers for verifications

        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                if(json){ //condition to check the valid json 
                    valid_user = true //change the user to valid user
                }
            }
            catch (error) {
                console.error(error.message);
            };
        })

    }).on('error', (e) => {
        console.error(e);
    });
}


/**
 * These function will Retrieve a data from the web 
 * getting the object from the web
 * @param {string} url - 'https://ghibliapi.herokuapp.com/films'
 */

function Retrievedata(url) {

    https.get(url, (res) => {
        console.log('statusCode:', res.statusCode); // to see the status code
        console.log('headers:', res.headers); // to see the headers for verifications

        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                console.log(json)//we can manupulate the incoming json here
            }
            catch (error) {
                console.error(error.message);
            };
        })

    }).on('error', (e) => {
        console.error(e);
    });

}


/**
 * These function will update the existing content in the web or create a new one based on the url
 * @param {string} url 
 * @param {string} updated_data -updated data to be posted in the web
 */
function updatedata(url, updated_data) {
    var options = {
        hostname: url,
        method: 'POST',
        headers: {
            //information for headers
            'Content-Length': updated_data.length
        }
    };

    var req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d); //console the responce from the web
        });

    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.write(updated_data); //post the data to the web
    req.end();
}


var updated_data = querystring.stringify({  //sample data
    'msg': 'Hello World!'
});


/**
 * check the user is valid or not 
 * if the user is valid 
 * call  the function to create ,update or Retrieve 
 */
if (valid_user){
    Retrievedata()
    updatedata()
}