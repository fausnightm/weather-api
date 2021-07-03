fetch('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}')
.then(response => {
    return response.json();
})
.then(weather => {
    console.log(weather);

});
