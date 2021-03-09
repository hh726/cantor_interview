const http = require('http');
const fs = require('fs');
const url = require('url');

const {create_response_html_single} = require('./weather/response');
const {create_response_html_multiple} = require('./weather/response');
const {single_search} = require('./weather/search');

const server = http.createServer(async function (req, res) {
    const reqUrl = url.parse(req.url, true);

    //Serve back static html homepage
    if (req.url == '/') {
        fs.readFile('./static/index.html', function(error, content) {
            res.writeHead(200, {'Content-Type': 'text/html'}); 
            res.end(content, 'utf-8');
        });

    }
    //serve css page
    else if (req.url == '/index.css') {
        fs.readFile('./static/index.css', function(error, content) {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(content);
        });
    }
    // api request for single city endpoint
    else if (reqUrl.pathname == '/single-search/' && req.method === 'GET') {
        try {
            //axios request single city
            const response =  await single_search(reqUrl.query.city);
            const data = response.data;
            //create response html page to serve back
            const html = create_response_html_single(data);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } catch (error) {
            //check for error codes
            if (!error.response) {
                res.end('Get request failed. Check API key.');
            }
            if (error.response.data.cod === '400') {
                res.writeHead(400, {'Content-Type': 'text/html'});
                res.end('400 Error. Sorry, the city was invalid, please try another.');
            }
            if (error.response.data.cod === '404' || error.response.data === '500') {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('500 Error. Sorry, the city was not found, please try another.');
            }
        }
    }
    // api request for multiple cities endpoint
    else if (reqUrl.pathname == '/multiple-search/' && req.method === 'GET') {
        let resultArray = [];
        for (let key in reqUrl.query) {
            //run single search in a for loop to search all
            const response = await single_search(reqUrl.query[key]);
            resultArray.push(response.data);
        }
        //create response html page to serve back
        const html = create_response_html_multiple(resultArray);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end(); 
    }
    else {
        res.end('Invalid Request!');
    }
});

server.listen(3000);

console.log('Node server listening on localhost:3000...');
