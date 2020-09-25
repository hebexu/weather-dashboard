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
        
      }).fail(function(ff){alert("City not found!");});
  
  
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
  
    // ҳ�����и� idΪdate-today�� div�� �������������div� ���ϵ�ǰʱ��
  function UpdateNowTime()
  {
      $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
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
  
    
    // �޸�ҳ���ϵ�cal����
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