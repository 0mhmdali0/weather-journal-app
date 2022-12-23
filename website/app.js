 /* Global Variables */
const URL= "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API

const apiKey= "&appid=8ab2b5286b97e77e22d21bd1323caa93&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',doSomething);

/* Function called by event listener */
async function doSomething(){
  const newZip = document.getElementById('zip').value;
  const newFeeling = document.getElementById('feelings').value
  try{
    let weather= await getWeather(URL, newZip, apiKey);
    let data = {
      date: newDate,
      temp: weather.main.temp,
      content: newFeeling
    } 
    postData('/route', data).then(retrieveData());
  }
  catch(error){
    console.log("wrong zip code:",newZip);
  }
}
 /* Function to GET Web API Data*/
const getWeather = async(url, zip, key)=>{
  const response = await fetch(url + zip + key)
  try {
    const weather = await response.json();
    return weather;
  }
  catch (error){
    console.log("error",error)
  }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const res = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });
  try {
    const newData = await res.json();
    return newData;
  }catch(error) {
    console.log("error", error);
  }
};
/* Function to GET Project Data */
const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'imperial';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById("date").innerHTML =allData.date;
  }
  catch(error) {
    console.log("error", error);
  }
}
