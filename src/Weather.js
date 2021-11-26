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
    const cityName = 'London,uk';
    const url = `${settings.urls.api.weatherByCityName}${cityName}${settings.keys.weatherApiKey}`;

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
    }, []);

    return (
        <>
            {weather ? (
                <StyledWeather title='sunrise and sunset'>
                    <h2>{weather.name}</h2>
                    <div>{`${formatDate(weather.sys.sunrise)}am`}</div>
                    <div>{`${formatDate(weather.sys.sunset)}pm`}</div>
                </StyledWeather>
            ) : (
                <div>No data</div>
            )}
        </>
    );
}
