import { useEffect, useState } from "react";
import clearSky from '../../public/images/weather images/ClearSky.jpg'
import brokenClouds from '../../public/images/weather images/broken clouds.jpg'
import fewClouds from '../../public/images/weather images/few clouds.jpg'
import mist from '../../public/images/weather images/mist.jpg'
import rain from '../../public/images/weather images/rain.jpg'
import scatteredClouds from '../../public/images/weather images/scattered clouds.jpg'
import showerRain from '../../public/images/weather images/shower rain.jpg'
import snow from '../../public/images/weather images/snow.jpg'
import thunderstorm from '../../public/images/weather images/thunderstorm.jpg'

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric

export default function useWeather(cityName) {

    const [weatherErrorMsg, setweatherErrorMsg] = useState();
    const [wloading, setwLoading] = useState(false);

    const apiKey = '7088d3220ea90449ffe6aa3bda4c8dfa';

    const [showd, setShowd] = useState({
        city: '',
        icon: '',
        description: '',
        temp: '',
        feels_like: '',
        humidity: '',
        windSpeed: '',
    });
    const [weatherImg, setWeatherImage] = useState()


    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const city = cityName ? cityName : 'ambala'
                console.log("Fetching weather data for city:", cityName);
                setwLoading(true);
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                if (response.ok) {
                    setShowd({
                        city: data.name,
                        icon: data.weather[0].icon,
                        description: data.weather[0].description,
                        temp: (data.main.temp).toFixed(1),
                        feels_like: (data.main.feels_like).toFixed(1),
                        humidity: data.main.humidity,
                        windSpeed: data.wind.speed,
                    });
                    // console.log(data);
                    setwLoading(false);
                    setweatherErrorMsg('');
                } else {
                    setweatherErrorMsg(data.message || 'Error fetching data');
                    setwLoading(false);
                }

            } catch (error) {
                setweatherErrorMsg('The error is ' + error.message);
                setwLoading(false);
            }
        }

        fetchWeatherData();
    }, [cityName]);

    useEffect(() => {
        if (showd.icon) {
            updateWeatherImage(showd.icon);
        }
    }, [showd.icon]);

    function updateWeatherImage(icon) {
        switch (icon) {
            case '01d':
            case '01n':
                setWeatherImage(clearSky);
                break;
            case '02d':
            case '02n':
                setWeatherImage(fewClouds);
                break;
            case '03d':
            case '03n':
                setWeatherImage(scatteredClouds);
                break;
            case '04d':
            case '04n':
                setWeatherImage(brokenClouds);
                break;
            case '09d':
            case '09n':
                setWeatherImage(showerRain);
                break;
            case '10d':
            case '10n':
                setWeatherImage(rain);
                break;
            case '11d':
            case '11n':
                setWeatherImage(thunderstorm);
                break;
            case '13d':
            case '13n':
                setWeatherImage(snow);
                break;
            case '50d':
            case '50n':
                setWeatherImage(mist);
                break;
            default:
                setWeatherImage(null);
                break;
        }
    }

    useEffect(() => {
        if (showd.icon) {
            updateWeatherImage(showd.icon);
        }

    }, [showd.icon]);

    return ({ showd, weatherErrorMsg, wloading, weatherImg })
}
