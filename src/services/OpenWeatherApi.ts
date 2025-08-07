import axios from 'axios';
import { CityResponse, CityData, CityList } from '../models/CityInfoModels';
import { Forecast, ForecastData, WeatherForecast } from '../models/ForecastInfoModel';
import { WeatherResponse, WeatherData } from '../models/WeatherInfoModel';
import { formatDate, formatWeekday } from '../utils/fortamatDate';

const baseURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'sua_api_key_aqui';
const lang = 'pt_br';
const units = 'metric';

export class OpenWeatherApi {

    async getCityCoordsByName(cityName: string): Promise<CityData[]> {
        try{
            const response = await axios.get(`${baseURL}find?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`);
            const data: CityResponse = response.data;
            if(data.cod === '200') {
                const filteredList: CityData[] = response.data.list.map((item: CityList) => {
                    return {
                        id: item.id,
                        name: item.name,
                        lat: item.coord.lat,
                        lon: item.coord.lon,
                        country: item.sys.country
                    }
                });
                return filteredList;
            }
            else if(data.cod === '400') {
                return [];
            }
            return [];
        } catch (error) {
            throw error;
        }
    }

    async getCityWeather(lat: number, lon: number): Promise<WeatherData | null> {
        try {
            const response = await axios.get(`${baseURL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`);
            const data: WeatherResponse = response.data;
            if (data.cod === 200) {
                return {
                    city: data.name,
                    country: data.sys.country,
                    temp: Math.round(data.main.temp),
                    feels_like: Math.round(data.main.feels_like),
                    temp_min: Math.floor(data.main.temp_min),
                    temp_max: Math.ceil(data.main.temp_max),
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    wind_speed: data.wind.speed,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    timezone: data.timezone
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    };

    async getCityForecast(lat: number, lon: number): Promise<ForecastData[] | null> {
        try{
            const response = await axios.get(`${baseURL}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`);
            const data: WeatherForecast = response.data;

            if(data.cod === '200') {
                const filterKeys = new Set(data.list.map((item: Forecast) => item.dt_txt.split(' ')[0]));
                const todayDate = formatDate(new Date().toISOString().split('T')[0]);

                const filteredList: ForecastData[] = Array.from(filterKeys).map((key: string) => {
                    const filteredItems = data.list.filter((item: Forecast) => item.dt_txt.split(' ')[0] === key);
                    const formattedKey = formatDate(key);
                    const newKey = todayDate === formattedKey ? 'Hoje' : formatWeekday(key)
                                  + ' - ' + formatDate(key);
                    return {
                        key: newKey,
                        data: filteredItems.map((item: Forecast) => {
                            return {
                                hour: item.dt_txt.split(' ')[1],
                                temp: Math.round(item.main.temp),
                                icon: item.weather[0].icon,
                                description: item.weather[0].description
                            }
                        })
                    }
                })

                return filteredList;
            }
            
            return null;

        } catch (error) {
            throw error;
        }
    };
};


