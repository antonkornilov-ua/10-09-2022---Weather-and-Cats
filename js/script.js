// Weather
const weatherBlock = document.querySelector('#weather');
async function loadWeather() {
    weatherBlock.innerHTML = `
    <div class="weather__loading"><img src='assets/loading.gif' alt='Loading...' >
    </div>`;
    const server =
        'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=ab54429ab157825232cab97e89867df3';
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();
    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}
function getWeather(data) {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
    console.log(data);
    const template = `
    <div class="weather__header">
        <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
    </div>
    <div class="weather__icon">
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
    </div>
    </div>
    <div class="weather__temp">${temp}</div>
    <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;
    weatherBlock.innerHTML = template;
}

if (loadWeather) {
    loadWeather();
}
// Cat
const catBlock = document.querySelector('#cats');
const catBtn = document.querySelector('.cat-button');
const catImg = document.querySelector('.cat-image');

const catServer = 'https://aws.random.cat/meow';

async function catFetch() {
    const catResponse = await fetch (catServer);
    const catResponseResult = await catResponse.json();
    if (catResponse.ok){
        renderCat(catResponseResult);
    } else {
        catBlock.innerHTML = catResponseResult.message;
    }
}
function renderCat(catData) {
    const catImgUrl = catData.file
    catImg.src = catImgUrl;
}

catBtn.addEventListener('click', catFetch);

if (catFetch){
    catFetch()
}