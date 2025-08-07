import React, { useEffect, useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { OpenWeatherApi } from '../../services/OpenWeatherApi';
import { CityData, Coordinates } from '../../models/CityInfoModels';

type Props = {
    setCoords: React.Dispatch<React.SetStateAction<Coordinates | null>>
}
export const SearchDropDown = ({ setCoords }: Props) => {
    const [city, setCity] = useState<string>('');
    const [results, setResults] = useState<CityData[]>([]);
    const _service = useMemo(() => new OpenWeatherApi(), []);

    const fetchDataCoords = async () => {
        const response = await _service.getCityCoordsByName(city);
        setResults(response);
    };

    const handlePress = (item: CityData) => {
        setCoords({ lat: item.lat, lon: item.lon });
        setResults([]);
        setCity("");
    };

    useEffect(() => {
        if(city){
            console.log('Buscando cidade:', city);
            fetchDataCoords();
        }
    }, [city]);

    return (
        <View>
            <TextInput
                placeholder="Pesquisar cidade"
                value={city}
                onChangeText={setCity}
                style={styles.input}
            />
            <View>
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => 
                        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
                            <Text style={styles.title}>{item.name}, {item.country}</Text>
                            <Text style={styles.subtitle}>ID: {item.id} | lat: {item.lat} | lon: {item.lon}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginTop: 15,
        marginHorizontal: 8,
        color: 'black',
        fontSize: 16,
        backgroundColor: 'white',
        fontFamily: 'Roboto',
    },
    item: {
        padding: 10,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    subtitle: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Roboto',
    }
});