import axios from 'axios'
import { useEffect, useState } from 'react'

const key = process.env.REACT_APP_API_KEY

const Weather = ({name, info}) =>{
    const [weather, setWeather] = useState({})
    var img = new Image()
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${info[0]}&lon=${info[1]}&appid=${key}&units=metric`
    useEffect( () => {
        axios
        .get(url)
        .then( response =>
            setWeather({
                temperature: response.data.main.temp,
                wind: response.data.wind.speed,
                description: response.data.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            })
        )
        
    }, [])

    
    return (
        <div>
            <h3>Weather in {name}</h3>
            <img src={weather.icon}/>
            <p>temperature {weather.temperature} Celcius</p>
            <p>wind {weather.wind} m/s</p>
        </div>
    )
}

export default Weather