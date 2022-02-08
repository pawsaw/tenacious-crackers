import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useForecast } from '../../domain/forecast';
import { useLocation } from '../../domain/location';
import { SendMyLocation } from './SendMyLocation';
import { WeatherWidget } from './WeatherWidget';

export const ForecastScreen = () => {
    const location = useLocation();
    const forecast = useForecast();

    if (!forecast || !location) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <WeatherWidget />
            <SendMyLocation />
        </View>
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
});
