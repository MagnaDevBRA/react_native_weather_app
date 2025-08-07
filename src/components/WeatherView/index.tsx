import { View, Text, StyleSheet, Image} from "react-native";
import { Coordinates } from "../../models/CityInfoModels";
import { OpenWeatherApi } from "../../services/OpenWeatherApi";
import { useEffect, useMemo, useState } from "react";
import { WeatherData } from "../../models/WeatherInfoModel";
import Entypo from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const WeatherView = ({ coords }: { coords: Coordinates }) => {
    const _service = useMemo(() => new OpenWeatherApi(), []);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const fetchData = async () => {
        const response = await _service.getCityWeather(coords.lat, coords.lon);
        setWeather(response);
    }

    useEffect(() => {
        if(!coords) setWeather(null);
        else fetchData();
    }, [coords]);

    if (!coords) return null;
    else if (!weather) return null; 
    else return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Entypo name="location" size={20} color="black" />
                <Text style={styles.headerText}>{weather.city}, {weather.country}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.temp}>{weather.temp}°C </Text>
                <Image style={styles.iconWeather} source={{uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`}} />
                <Text style={styles.description}>{weather.description}</Text>
            </View>

            <Text style={styles.subTitle}>Sensação térmica: {weather.feels_like}°C</Text>

            <View style={styles.extraInfo}>
                <View style={styles.iconText}>
                    <AntDesign name="arrowdown" size={18} color="black" />
                    <Text>{weather.temp_min}°C</Text> 
                </View>
                <View style={styles.iconText}>
                    <AntDesign name="arrowup" size={18} color="black" />
                    <Text>{weather.temp_max}°C</Text>
                </View>           
            </View>

            <View style={styles.extraInfo}>
                 <View style={styles.iconText}>
                    <FontAwesome6 name="droplet" size={18} color="black" />
                    <Text >{weather.humidity}%</Text>
                </View>
                <View style={styles.iconText}>
                    <FontAwesome6 name="wind" size={18} color="black" />
                    <Text>{weather.wind_speed}m/s</Text>
                </View>
            </View>
            
            <View style={styles.extraInfo}> 
                <View style={styles.iconText}>
                    <Feather name="sunrise" size={18} color="black" />
                    <Text>{new Date(weather.sunrise * 1000).toLocaleTimeString().slice(0, 5)}</Text>
                </View>
                <View style={styles.iconText}>
                    <Feather name="sunset" size={18} color="black" />
                    <Text>{new Date(weather.sunset * 1000).toLocaleTimeString().slice(0, 5)}</Text>
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#afeeee',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 20
    },
    header : {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    headerText: {
        fontSize: 20
    },
    info: {
        alignItems: 'center',
    },
    temp: {
        fontSize: 60
    },
    iconWeather: {
        width: 80,
        height: 80,
    },
    description: {
        fontSize: 20,
        textTransform: 'capitalize',
    },
    subTitle: {
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 5
    },
    extraInfo: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        justifyContent: 'space-between'
    },
    iconText:{
        flexDirection: 'row',
        gap: 10,
    }
});