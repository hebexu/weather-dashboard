var weathCity = {
    "": "",
  };
  
  var APIKey = "6e5f6b7d879d78a11f873cfcdae38118";
  
      // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey+"&q=";
  
    // jQuery 里的方法， 在页面加载完成时，会自动调用 ready 函数
    // localStorage 是浏览器的本地存储单元， 保存了在页面里写的那些 task
    // 这个方法， 把保存在 localStorage 里的 task 文字， 填在页面上
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
           
  
        // Create CODE HERE to calculate the temperature (converted from Kelvin)// Create CODE HERE to transfer content to HTML
        $(".city").html("<h1>" + response.name + "<span> Weather Details</span></h1>");
        $(".temp").html("Temperature (F):" + response.main.temp);
        $(".wind").html("Wind Speed:" + response.wind.speed);
        $(".humidity").html("Humidity:" + response.main.humidity);
      //  $(".latlon").html("Lat:" + response.coord.lat+", Lon:"+response.coord.lon);
  
  
        $("#lon").val(response.coord.lon);
        $("#lat").val(response.coord.lat);
  
  
        if (weathCity[response.name] != "")
        $(".searchCitys").html("<div>"+response.name+"</div>"+$(".searchCitys").html());
        
  
        // 保存当前查询的城市到左侧列表
        saveSchedule(response.name,"");
  
        // 获取紫外线值
        GetUVNum($("#lat").val(),$("#lon").val())
  
        // 获取5天天气预测
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
  
    // 页面上有个 id为date-today的 div， 下面这句会在这个div里， 填上当前时间
  function UpdateNowTime()
  {
      $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
  
  
    // 从本地存储里，取出之前保存的内容
  function loadCorrectDataset() {
    result = localStorage.getItem('weathCity')
    return (result ? result : weathCity);
  }
  
    // 初始化本地存储
  function initializeLocalStorage() {
    localStorage.setItem('weathCity', JSON.stringify(weathCity));
  };
  
    // 修改本地存储
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('weathCity', JSON.stringify(dayObj));
  }
  
    // 如果本地存储里没有 weathCity 变量，则初始化一个
  function saveSchedule(hourString, val) {
  
    if(!localStorage.getItem('weathCity')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('weathCity'));
  
    workHours[hourString] = val;
    weathCity[hourString] = val;
  
    saveToLocalStorage(workHours);
  }
  
    
    // 修改页面上的cal内容
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
  