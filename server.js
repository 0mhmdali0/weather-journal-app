// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/*Dependencies*/
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors =require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3060;

const server = app.listen(port,listining);

function listining(){
    console.log(`server is running on local host: ${port}`);
}
// Initialize all route with a callback function
app.get('/all',function(request,response){
    response.send(projectData);
    
});

app.post('/route',function(request,response){
    console.log(request.body);
    newEntery = {
        date:request.body.date,
        temp: request.body.temp,
        content:request.body.content

    }
    projectData= newEntery;
});
