import { View, Text, SectionList, StyleSheet, Image} from "react-native";
import { Coordinates } from "../../models/CityInfoModels";
import { useEffect, useMemo, useState } from "react";
import { OpenWeatherApi } from "../../services/OpenWeatherApi";
import { ForecastData } from "../../models/ForecastInfoModel";

export const ForecastView = ({ coords }: { coords: Coordinates }) => {
    const _service = useMemo(() => new OpenWeatherApi(), []);
    const [forecast, setForecast] = useState<ForecastData[] | null>(null);

    const fetchData = async () => {
        const response = await _service.getCityForecast(coords.lat, coords.lon);
        setForecast(response);
    }

    useEffect(() => {
        if(!coords) setForecast(null);
        else fetchData();
    }, [coords]);

    if (!coords) return null;
    else if (!forecast) return null;
    return (
        <View style={styles.container}>
            <SectionList
                sections={forecast}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.hour}>{item.hour.substring(0, 5)}</Text>
                        <Text style={styles.temp}>{item.temp}°C</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Image style={styles.iconWeather} source={{uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`}} />
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderTitle}>{section.key}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#afeeee',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 20,
        height: 200,
        overflow: 'hidden'
    },
    sectionHeader: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#001166ff',
    },
    sectionHeaderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize'
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hour: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 14,
    },
    iconWeather: {
        width: 40,
        height: 40,
    },
    description: {
        textTransform: 'capitalize',
    },
});