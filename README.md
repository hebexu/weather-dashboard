# weather-dashboard

1. Project Introduction:

This page will help users to search the city weather information which includes wind speed, humidity, temperature as well as UV number, it will also generate 5 days forecast in the page. All searched information will keep in the page and save to localstorage.  
The date of development: 25th Sep, 2020.
Developer: Hebe

2. Project coding introduction:

The project includes 3 source files: index.html is responsible for user interface and communication operation; script.js is responsible for get weather information and save to local storage. style.css is responsible for the display style of HTML. index.html will call script.js file and sytle.css file.

3. Workday schedule implementation introduction:

script.js is responsible for using jQuery functions to get the weather data ,  initializing local storage, saving data to localstorage as well as displaying data to the page from local storage. Below main functions have been adopted:

function GetWeather()
function GetWeatherByName(cityname)
function GetForecastWeather()
function UpdateNowTime()
function loadCorrectDataset()
function initializeLocalStorage()
function saveToLocalStorage(dayObj)
function saveSchedule(hourString, val)
function updateList(dayObject)

<p><li>InitializeLocalStorage() function;</li>
<li>SaveToLocalStorage() function;</li>
<li>SaveSchedule() function;</li>
<li>UpdateCalendarTasks() function;</li></p>

<p>The URL of the deployed application.
https://hebexu.github.io/weather-dashboard/</p>

<p>The URL of the GitHub repository.
https://github.com/hebexu/weather-dashboard</p>

Here is the screeshot of Adelaide Weather Dashboard:
![Adelaide Weather Details](https://github.com/hebexu/weather-dashboard/blob/master/asset/Adelaide%20Weather.png)

Here is the screeshot of Brisbane Weather Dashboard:
![Brisbane Weather Details](https://github.com/hebexu/weather-dashboard/blob/master/asset/Brisbane%20Weather.png)

Here is the screeshot of Melbourne Weather Dashboard:
![Melbourne Weather Details](https://github.com/hebexu/weather-dashboard/blob/master/asset/Melbourne%20Weather.png)