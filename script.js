var weathCity = {
    "": "",
  };
  
  var APIKey = "6e5f6b7d879d78a11f873cfcdae38118";
  
      // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=" + APIKey+"&q=";
  
    // jQuery ��ķ����� ��ҳ��������ʱ�����Զ����� ready ����
    // localStorage ��������ı��ش洢��Ԫ�� ��������ҳ����д����Щ task
    // ��������� �ѱ����� localStorage ��� task ���֣� ����ҳ����
  $(document).ready(function(){
  loadCorrectDataset();
  
  GetWeather("Adelaide");
    if(!localStorage.getItem('weathCity')) {
      updateCalendarTasks(weathCity);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('weathCity')));
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
           
        // Create CODE HERE to Log the queryURL
        //console.log(queryURL);
        // Create CODE HERE to log the resulting object
        
        // Create CODE HERE to calculate the temperature (converted from Kelvin)// Create CODE HERE to transfer content to HTML
        $(".city").html("<h1>" + response.name + "<span> Weather Details</span></h1>");
        $(".wind").html("Wind Speed:" + response.wind.speed);
        $(".wind").html("Wind Speed:" + response.wind.speed);
        $(".humidity").html("Humidity:" + response.main.humidity);
        $(".temp").html("Temperature (F):" + response.main.temp);
        $(".latlon").html("Lat:" + response.coord.lat+", Lon:"+response.coord.lon);
  
  
        $("#lon").val(response.coord.lon);// = response.coord.lon;
        $("#lat").val(response.coord.lat);// = response.coord.lat;
  
  
        if (weathCity[response.name] != "")
        $(".searchCitys").html("<div>"+response.name+"</div>"+$(".searchCitys").html());
        
        
        saveSchedule(response.name,"");
        GetForecastWeather();
        //$(".rain").html("Rain for 3h:" + response.rain.3h);
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        // Create CODE HERE to dump the temperature content into HTML
  
      }).fail(function(ff){alert("City not found!");});
  
  
  }
  
  
  function GetForecastWeather()
  {
  
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+$("#lat").val()+"&lon="+$("#lon").val()+"&exclude=hourly,minutely&appid="+APIKey;
  
  
   $.ajax({
        url: apiUrl,
        method: "GET"
      }).then(function(response) {
           
        // Create CODE HERE to Log the queryURL
        //console.log(queryURL);
        // Create CODE HERE to log the resulting object
  
        var today = moment().add(1,"days").format('DD/MM/YYYY');
        // Create CODE HERE to calculate the temperature (converted from Kelvin)// Create CODE HERE to transfer content to HTML
        for (var i=1;i<6;i++)
        {
          $("#forecast"+i).html("<div>"+moment().add(i,"days").format('DD/MM/YYYY')+"<br />"+response.daily[i].weather[0].main+" <br /><br />Temp: "+ response.daily[i].temp.day + "<br />Humidity: "+response.daily[i].humidity+"</div>");
        }
  
   //var dt = response.current.dt;
  // alert(response.daily[0].dt);response.daily[3].dt
   var dd = moment().utc("1601173800").format('YYYY-MM-DD hh:mm:ss');
  
   //var date =new Date(dt);
   //alert(date.getFullYear());
   //var d = moment.duration(response.daily[0].dt, 'milliseconds');
   // alert(d);
  //var hours = d.format("YYYY-MM-DD HH:mm:ss");
  
  
   
        //$(".rain").html("Rain for 3h:" + response.rain.3h);
        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        // Create CODE HERE to dump the temperature content into HTML
  
      });
  }
  
    // ҳ�����и� idΪdate-today�� div�� �������������div� ���ϵ�ǰʱ��
  function UpdateNowTime()
  {
      $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  }
  
    // ���ݵ�ǰʱ�䣬�ı�ҳ���ϲ�ͬʱ�ε��е�css��ʽ����ʵ�Ƕ�Ӧ��demo�￴���Ĳ�ͬʱ���б���ɫ��һ����
  var counter = 1;
  for(const property in weathCity) {
    var textEntry = "#text-entry" + counter;
    $(textEntry).text(weathCity[property]);
    var timeId = "#time" + counter;
    var presentHour = moment().hour();
    
    var timeString = $(timeId).text();
    var timeNumber = hourNumberFromHourString(timeString);  
    if(timeNumber < presentHour) {
      $(textEntry).addClass("past-hour");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future-hour");
    } else {
      $(textEntry).addClass("present-hour");
    }
    counter ++;
  }
  
    // �����д��task�� ������button����������ݵ����ش洢localStorage��
  function saveCal(nid)
  {
    value = $("#text-entry"+nid).val();
    hourString = $("#time"+nid).text().trim();
    saveSchedule(hourString, value);
  }
  
  
    // �ӱ��ش洢�ȡ��֮ǰ���������
  function loadCorrectDataset() {
    result = localStorage.getItem('weathCity')
    return (result ? result : weathCity);
  }
  
    // ��ʼ�����ش洢
  function initializeLocalStorage() {
    localStorage.setItem('weathCity', JSON.stringify(weathCity));
  };
  
    // �޸ı��ش洢
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('weathCity', JSON.stringify(dayObj));
  }
  
    // ������ش洢��û�� weathCity ���������ʼ��һ��
  function saveSchedule(hourString, val) {
  
    if(!localStorage.getItem('weathCity')) {
      initializeLocalStorage();
    }
  
    var workHours = JSON.parse(localStorage.getItem('weathCity'));
  
    workHours[hourString] = val;
    weathCity[hourString] = val;
  
    saveToLocalStorage(workHours);
  }