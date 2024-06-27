const apiKey = "64dea2f3ba8bd2b45734c242c3a23731";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector(".weather-icon");
let weather = document.querySelector('.weather');
async function checkWeather(cityName){

  if (!cityName.trim()) {
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = 'none';
   
  }
  const response = await fetch(apiUrl  + cityName + `&appid=${apiKey}`);

  if(response.status == 404 ){
    document.querySelector('.error').style.display = 'block'
    document.querySelector('.weather').style.display = 'none'
    document.querySelector(".city").innerHTML = '';
    document.querySelector(".temp").innerHTML = '';
    document.querySelector(".humidity").innerHTML = '';
    document.querySelector(".wind").innerHTML = '';
    weatherIcon.src = ''; // Clear the weather icon
  }
  else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round( data.main.temp) + `°c`;
    document.querySelector(".humidity").innerHTML = data.main.humidity + `%`;
    document.querySelector(".wind").innerHTML = data.wind.speed + ` km/h`;
  
  if(data.weather[0].main =='Clouds'){
          weatherIcon.src = 'images/clouds.png'
  }   else if(data.weather[0].main == 'Clear'){
      weatherIcon.src = 'images/clear.png'
  } 
    else if(data.weather[0].main == 'Rain'){
      weatherIcon.src = 'images/rain.png'
  } 
    else if(data.weather[0].main == 'Drizzle'){
      weatherIcon.src = 'images/drizzle.png'
  } 
    else if(data.weather[0].main == 'Mist'){
      weatherIcon.src = 'images/mist.png'
  } 
  document.querySelector('.weather').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
  }

}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
    if(!searchBox.value==false){
    weather.style.display = 'block'
    searchBox.value = "";
  }
})


