import React, { useCallback } from 'react';
import { LocationProvider, useLocation } from './domain/location';
import { ForecastProvider } from './domain/forecast';
import { ForecastScreen } from './screens/ForecastScreen/ForecastScreen';

// Dear developer, welcome to our challenge!
// Check out our little app written by junior developer
// App simply retrieves GPS location and uses it to get weather information and allows user to send his location to someone using the postLocation function.
//
// We would like to ask you following:
// 1. refactor the code so that it looks like you wrote it
// 2. there are some bugs, please write them down and fix them along the way - we would like to give feedback to our junior dev
// 3. consider the hints in comments while refactoring code
// 4. we do not expect you to spend more than 15 minutes of your valuable time

const AppWithLocation: React.FC = () => {
    const onForecastError = useCallback((error) => {
        alert(`Couldn't load forecast, due to ${error}`);
    }, []);

    const location = useLocation();

    return (
        <ForecastProvider location={location} onError={onForecastError}>
            <ForecastScreen />
        </ForecastProvider>
    );
};

export default function App() {
    const onLocationPermissionDenied = useCallback((msg) => {
        alert(`Location permission required.`);
    }, []);

    return (
        <LocationProvider onDeny={onLocationPermissionDenied}>
            <AppWithLocation />
        </LocationProvider>
    );
}
