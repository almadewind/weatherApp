const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        console.log(data)
        setWeatherData(data, place.formatted_address)
    })

    const statusElement = document.querySelector('[data-status]')
    const locationElement = document.querySelector('[data-location]')
    const temperatureElement = document.querySelector('[data-temp]')
    const presionElement = document.querySelector('[data-presion]')
    const humedadElement = document.querySelector('[data-humedad]')
    const windElement = document.querySelector('[data-wind]')
    const overcastElement = document.querySelector('[data-overcast]')
    const iconElement = document.getElementById('icon')

    function setWeatherData(data, place) {
        statusElement.textContent = data.weather[0].description
        locationElement.textContent = place
        temperatureElement.textContent = data.main.temp
        presionElement.textContent = data.main.pressure
        humedadElement.textContent = data.main.humidity
        windElement.textContent = data.wind.speed
        overcastElement.textContent = data.main.feels_like
        iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    }
})