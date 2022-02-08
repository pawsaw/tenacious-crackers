import Constants from 'expo-constants';
import { Text, StyleSheet, Image } from 'react-native';

import { Forecast, useForecast } from '../../../domain/forecast';
import { useLocation } from '../../../domain/location';

interface SymbolProps {
    forecast: Forecast;
}

const Symbol: React.FC<SymbolProps> = ({ forecast }) => {
    const symbol_code = forecast.properties.timeseries[0].data.next_1_hours.summary.symbol_code;

    return (
        <Image
            source={{
                uri: 'https://api.met.no/images/weathericons/png/' + symbol_code + '.png',
            }}
            style={styles.image}
        />
    );
};

export const WeatherWidget = () => {
    const location = useLocation()!;
    const forecast = useForecast()!;

    const air_temperature = forecast.properties.timeseries[0].data.instant.details.air_temperature;

    return (
        <>
            <Symbol forecast={forecast} />
            <Text style={styles.paragraph}>
                Temperature {air_temperature} {`°C`} at [{location.coords.latitude},{' '}
                {location.coords.longitude}]
            </Text>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: 'white',
    },
});
