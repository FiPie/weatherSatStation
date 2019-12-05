var apiKey = "GET YOUR OWN APPID AT: https://openweathermap.org";
var zoom = $('#zoom').val();
var currentZoom = zoom;
var lat, lon;
var layer = $('#layersUI').val();
var from = $('#satelites').val();
var order = $('#order').val();
var where = 'now-300';
var select = 'b4,b3,b2';
var op = $('#op').val();
var color;

$(function() {

  var cityUI = $('#cityUI').val();
  var unitsUI = $('#unitsUI').val();
  getWeather(cityUI);



  //fetch weather info on click
  $('#button').click(function() {
    getWeather();
  });
  $('#cityUI').keyup(function(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      $("#button").trigger("click");;
    }
  });



  //Zooming in and out the weather tile map
  $('#currentZoom').val('zoom:' + zoom);

  $('#zoomOut').click(function() {
    $('#zoom').val(--zoom);
    $("#zoom").trigger("change");
  });
  $('#zoomIn').click(function() {
    $('#zoom').val(++zoom);
    $("#zoom").trigger("change");
  });
  $('#zoom').change(function(event) {
    zoom = $('#zoom').val();
    currentZoom = zoom;
    $('#currentZoom').val('zoom:' + zoom);
    getWeatherMap(lat, lon, zoom)
  });


  //Reload the weather info upon unit change
  $('#unitsUI').change(function(event) {
    getWeather();
  });
  $('#layersUI').change(function(event) {
    layer = $('#layersUI').val();
    getWeatherMap(lat, lon, zoom);
  });
  $('#satelites').change(function(event) {
    from = $('#satelites').val();
    getWeatherMap(lat, lon, zoom);
  });
  $('#order').change(function(event) {
    order = $('#order').val();
    getWeatherMap(lat, lon, zoom);
  });
  $('#op').change(function(event) {
    op = $('#op').val();
    getWeatherMap(lat, lon, zoom);
  });


});



function getWeather() {
  cityUI = $('#cityUI').val();
  unitsUI = $('#unitsUI').val();
  var urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityUI + "&units=" + unitsUI + "&appid=" + apiKey;

  //server sends data using GET method as JSON
  $.getJSON(urlWeather,
    function(result) {

      console.log(result);
      $('#city').html(result.name);
      $('#temp').html(result.main.temp);
      $('#pressure').html(result.main.pressure);
      $('#humidity').html(result.main.humidity);
      $('#visibility').html(result.visibility);
      $('.units').html(unitsUI === 'imperial' ? 'F' : 'C');
      //gets weather-coresponding icon
      $("#image").attr("src", "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png");
      zoom = $('#zoom').val();
      lat = result.coord.lat;
      lon = result.coord.lon;
      getWeatherMap(lat, lon, zoom);

    }).fail(function() {
    alert('Incorrect City name');
    $('#cityUI').val('');
  });
}


function getWeatherMap(lat, lon) {
  console.log('lat:' + lat + '  lon:' + lon);
  from = $('#satelites').val();
  order = $('#order').val();
  op = $('#op').val();
  zoom = $('#zoom').val();

  var layer = $('#layersUI').val();
  var latitude = lat;
  var longitude = lon;
  var x, y, z;
  z = zoom;
  x = Math.round((Math.pow(2, z)) * ((longitude + 180) / 360));
  y = Math.round((Math.pow(2, z)) * (1 - (Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI)) / 2);
  console.log('x=' + x + ' : y=' + y + ' : z=' + z);
  //var urlMap = 'https://tile.openweathermap.org/map/' + layer + '/' + z + '/' + x + '/' + y + '.png?appid=' + apiKey;
  //console.log('urlMap: ' + urlMap);

  var fullUrl = 'https://sat.owm.io/sql/' + z + '/' + x + '/' + y + '?from=' + from + '&where=' + where + '&order=' + order + '&op=' + op + '&APPID=' + apiKey;
  var testUrlModis = 'https://a.sat.owm.io/api/search?lat=55&lon=37&select=b1,b4,b3&from=modis&order=first&APPID=' + apiKey;
  //var lolaUrl = 'https://sat.owm.io/api/3.0/search?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;


  $("#map").attr("src", testUrlModis);
  $("#map").attr("alt", testUrlModis);
  console.log('fullUrl: ' + testUrlModis);

  // {layer} => layer name
  // {z} => number of zoom level
  // {x} => number of x tile coordinate
  // {y} => number of y tile coordinate
  // {api_key} => Your API key
  //https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}

  //   --- javascript ---
  // var lat = 52.525439, // Latitude
  // lon = 13.38727,    // Longitude
  // z = 12,        // Zoom level
  // latRad,
  // n,
  // xTile,
  // yTile;
  //
  // latRad = lat * Math.PI / 180;
  // n = Math.pow(2, z);
  // xTile = n * ((lon + 180) / 360);
  // yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) /Math.PI)) / 2;
  //
  // --- output ---
  // lat_rad = 0.916
  // n = 4096
  // xTile = 2200.31 // Column
  // yTile = 1343.20 // Row
}


function getWeatherData() {
  var url = 'https://api.openweathermap.org/data/2.5/find?q=Palo+Alto&units=imperial&type=accurate&mode=json&APPID=' + apiKey;
  $('#load').load(url);
}