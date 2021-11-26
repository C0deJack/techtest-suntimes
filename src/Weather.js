import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getData from './helpers/getData';
import debounce from './helpers/debounce';
import appSettings from './appconfig.json';
const settings = appSettings;

const StyledWeather = styled.div`
    padding: 0.5rem;
`;

export default function Weather() {
    const [location, setLocation] = useState({});

    useEffect(() => {
        console.log('getting location');
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                handleFoundLocation,
                handleError
            );
        }
    }, []);

    const handleFoundLocation = data => {
        setLocation({
            lat: data.coords.latitude,
            lon: data.coords.longitude,
        });
    };

    const handleError = err => console.log(err);

    const url = `${settings.api.sunTimesByLatLon}lat=${location.lat}&lng=${location.lon}`;

    const [weather, setWeather] = useState('');

    useEffect(() => {
        debounce(
            getData(url)
                .then(data => {
                    console.log(data);
                    return setWeather(data.results);
                })
                .catch(() => setWeather('')),
            1000,
            true
        );
    }, [location]);

    return (
        <>
            {weather ? (
                <StyledWeather title='sunrise and sunset'>
                    <h2>{weather.name}</h2>
                    <div>{weather.sunrise}</div>
                    <div>{weather.sunset}</div>
                </StyledWeather>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
}
