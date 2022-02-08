import React, { useContext, useEffect, useState } from 'react';
import { noop } from '../../util/noop';
import { Location } from './Location';
import * as ExpoLocation from 'expo-location';

const LocationContext = React.createContext<Location | null>(null);

export interface OnDeny {
    (msg: string): void;
}

export interface LocationProviderProps {
    onDeny?: OnDeny;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children, onDeny = noop }) => {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

            if (status === ExpoLocation.PermissionStatus.GRANTED) {
                let location = await ExpoLocation.getCurrentPositionAsync();
                setLocation(location);
            } else if (status === ExpoLocation.PermissionStatus.DENIED) {
                onDeny('Permission to access location was denied');
            }
        })();
    }, []);

    return <LocationContext.Provider value={location}>{children}</LocationContext.Provider>;
};

export function useLocation(): Location | null {
    return useContext(LocationContext);
}
