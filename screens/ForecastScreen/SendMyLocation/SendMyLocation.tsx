import React, { useCallback, useState } from 'react';
import { Button, Text } from 'react-native';
import { Location, useLocation } from '../../../domain/location';

const postLocation = (l: Location) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({ success: true, sentLocation: l });
        }, 5000),
    );
};

export const SendMyLocation: React.FC = () => {
    const location = useLocation()!;

    const [message, setMessage] = useState('');
    const sendLocation = useCallback(() => {
        postLocation(location).then(() => setMessage('location sent'));
    }, [location]);

    return (
        <>
            <Button title="Send my location" onPress={sendLocation} />
            <Text>{message}</Text>
        </>
    );
};
