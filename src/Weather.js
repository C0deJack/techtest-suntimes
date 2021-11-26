import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getData from './helpers/getData';
import debounce from './helpers/debounce';
import formatDate from './helpers/formatDate';
import appSettings from './appconfig.json';
const settings = appSettings;

// Temp
// import { exampleData } from './helpers/exampleWeatherData';

const StyledWeather = styled.div`
    padding: 0.5rem;
`;

export default function Weather() {
    // const cityName = 'London,uk';
    // const url = `${settings.urls.api.weatherByCityName}${cityName}${settings.keys.weatherApiKey}`;

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

    // const lat = '52.2';
    // const lon = '0.12';

    const url = `${settings.urls.api.weatherByLatLon}lat=${location.lat}&lon=${location.lon}${settings.keys.weatherApiKey}`;

    const [weather, setWeather] = useState('');
    // const [weather] = useState(exampleData);

    useEffect(() => {
        debounce(
            getData(url)
                .then(data => {
                    console.log(data);
                    return setWeather(data);
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
                    <div>{`${formatDate(weather.sys.sunrise)}am`}</div>
                    <div>{`${formatDate(weather.sys.sunset)}pm`}</div>
                </StyledWeather>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
}
