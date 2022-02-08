import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Forecast } from './Forecast';
import React from 'react';
import { noop } from '../../util/noop';
import { Location } from '../location';

const ForecastContext = React.createContext<Forecast | null>(null);

export interface OnForecastError {
    (error: string): void;
}

export interface ForecastProviderProps {
    onError?: OnForecastError;
    location: Location | null;
}

export const ForecastProvider: React.FC<ForecastProviderProps> = ({
    location,
    children,
    onError = noop,
}) => {
    const [forecast, setForecast] = useState<Forecast | null>(null);

    useEffect(() => {
        if (!location) {
            return;
        }

        (async () => {
            const {
                coords: { latitude, longitude },
            } = location;
            const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`;
            try {
                const response = await axios.get<Forecast>(url);
                if (response.status !== 200) {
                    onError('Error while loading forecast.');
                    return;
                }

                setForecast(response.data);
            } catch (error) {
                onError(`Error while loading forecast: ${error}`);
            }
        })();
    }, [location]);

    return <ForecastContext.Provider value={forecast}>{children}</ForecastContext.Provider>;
};

export function useForecast(): Forecast | null {
    return useContext(ForecastContext);
}
