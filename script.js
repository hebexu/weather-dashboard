var weathCity = {
    "": "",
  };
  
  var APIKey = "6e5f6b7d879d78a11f873cfcdae38118";
  
      // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey+"&q=";
  
    // Using jQuery to call ready function automatically after loading the page; 
    // Using localStorage to save the task text
    // Display task text to the page from localStoragealStorage;
  $(document).ready(function(){
  loadCorrectDataset();
  
  GetWeather("Adelaide");
    if(!localStorage.getItem('weathCity')) {
      updateList(weathCity);
    } else {
      updateList(JSON.parse(localStorage.getItem('weathCity')));
    }
  
  })
  
  
  function GetWeather()
  {
  var city = $(".searchTxt").val();
  if (city.trim()=="")
  {
      city = "Adelaide";
  }
  GetWeatherByName(city);
  
  }
  
  function GetWeatherByName(cityname)
  {
  
  var city =cityname;
  
   $.ajax({
        url: queryURL+city,
        method: "GET"
      }).then(function(response) {
           
  
        // Create CODE HERE to transfer content to HTML
        $(".city").html("<h1>" + response.name + "<span> Weather Details</span></h1>");
        $(".temp").html("Temperature (F):" + response.main.temp);
        $(".wind").html("Wind Speed:" + response.wind.speed);
        $(".humidity").html("Humidity:" + response.main.humidity);
      //  $(".latlon").html("Lat:" + response.coord.lat+", Lon:"+response.coord.lon);
  
  
        $("#lon").val(response.coord.lon);
        $("#lat").val(response.coord.lat);
  
  
        if (weathCity[response.name] != "")
        $(".searchCitys").html("<div>"+response.name+"</div>"+$(".searchCitys").html());
        
  
        // Save the search result in left bottom table
        saveSchedule(response.name,"");
  
        // call UV number
        GetUVNum($("#lat").val(),$("#lon").val())
  
        // Call 5 days weather fcst number
        GetForecastWeather();
        
      }).fail(function(ff){alert("City not found!");});
  }
  
  function GetUVNum(lat,lon)
  {
      var UVurl = "http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+APIKey;
      // 查询紫外线
      $.ajax({
        url: UVurl,
        method: "GET"
      }).then(function(response) {
  
      $(".UVNum").html("UV:" + response.value);
      })
  }
  
  function GetForecastWeather()
  {
  
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+$("#lat").val()+"&lon="+$("#lon").val()+"&exclude=hourly,minutely&appid="+APIKey;
  
  
   $.ajax({
        url: apiUrl,
        method: "GET"
      }).then(function(response) {
           
  
        var today = moment().add(1,"days").format('DD/MM/YYYY');
  
        for (var i=1;i<6;i++)
        {
          $("#forecast"+i).html("<div>"+moment().add(i,"days").format('DD/MM/YYYY')+"<br />"+response.daily[i].weather[0].main+" <br /><br />Temp: "+ response.daily[i].temp.day + "<br />Humidity: "+response.daily[i].humidity+"</div>");
        }
  
         
      });
  }
  
    // Display current time in the "date-today" table
  function UpdateNowTime()
  {
      $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
  
  
    // Get save task text from localstorage
  function loadCorrectDataset() {
    result = localStorage.getItem('weathCity')
    return (result ? result : weathCity);
  }
  
    // Initiallize Local storage
  function initializeLocalStorage() {
    localStorage.setItem('weathCity', JSON.stringify(weathCity));
  };
  
    // Save to local storage 
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('weathCity', JSON.stringify(dayObj));
  }
  
    // Initial weathcity 
  function saveSchedule(hourString, val) {
  
    if(!localStorage.getItem('weathCity')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('weathCity'));
  
    workHours[hourString] = val;
    weathCity[hourString] = val;
  
    saveToLocalStorage(workHours);
  }
  
    
    // Update list 
  function updateList(dayObject) {
  
   for (var c in dayObject)
   {
    if (c.trim()!="")
    {
    weathCity[c.trim()] = "";
    $(".searchCitys").html("<div>"+c.trim()+"</div>"+$(".searchCitys").html());
    }
   }
  
   $(".searchCitys").children("div").each(function(index) {
  
   $(this).click(function(){
   GetWeatherByName($(this).html())});
  
  });
  }
  