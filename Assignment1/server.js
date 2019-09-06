var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) 
{
  //ended up not using this 
  //var parsedUrl = url.parse(request.url);

   if (request.method === 'GET') // PASSED
   {
    if (request.url === '/listings')
    {
      response.writeHead(200, {'Content-Type': 'Application/JSON'});
      response.write(JSON.stringify(listingData));
      response.end();
    }
    else //in case of wrong url
    {
      response.writeHead(404);
      response.end('Bad gateway error');
    }

   }
   else //fails to get response
   {
      response.writeHead(404);
      response.end('Bad gateway error');
   }
};

//Checking if the file exists
fs.access('listings.json',fs.constants.F_OK, (err) => {
  console.log(`listings.json ${err ? 'does not exist' : 'exists'}`)
});


fs.readFile('listings.json', 'utf8', function(err, data) 
{
  listingData = JSON.parse(data);
  http.createServer(requestHandler).listen(8080);
  console.log(`Server is listening : http://localhost:${port}`);
});
