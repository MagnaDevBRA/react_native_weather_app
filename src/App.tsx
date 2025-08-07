import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SearchDropDown } from './components/SearchDropDown';
import { useState } from 'react';
import { Coordinates } from './models/CityInfoModels';
import { WeatherView } from './components/WeatherView';
import { ForecastView } from './components/ForecastView';

export default function App() {
  const [coords, setCoords] = useState<Coordinates | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Previsão do Tempo</Text>
      </View>
      <View style={styles.body}>
        <SearchDropDown setCoords={setCoords} />

        {coords ? (
          <>
            <WeatherView coords={coords} />
            <ForecastView coords={coords} />
          </>
        ) : (
          <View style={styles.startCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardText}>Visualizador de dados meteorológicos. Faça uma busca para começar.</Text>
            </View>
          
            <Text style={styles.cardText}>Tecnologias: React Native, Expo e TypeScript</Text>
            <Text style={styles.cardText}>Feito por: Magna M. V. da Silva</Text>
            <Text style={styles.cardText}>2025</Text>
          </View>
        )}
      </View>

    </View>
  );
}
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    backgroundColor: 'rgb(33, 150, 243)',
    paddingTop: statusBarHeight,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Roboto',
    textAlign: 'center',
    padding: 10
  },
  body: {
    marginTop: statusBarHeight + 44,
    width: '100%'
  },
  startCard: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500
  },
  cardHeader: {
    marginBottom: 20,    
  },
  cardText: {
    fontSize: 10,
    marginBottom: 10,
    color: 'gray'
  },
});
