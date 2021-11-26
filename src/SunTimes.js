import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getLocation from './getLocation';
import getSunTimes from './getSunTimes';

const StyledSunTimes = styled.div`
    padding: 0.5rem;
`;

export default function SunTimes() {
    const [location, setLocation] = useState({});

    useEffect(() => {
        console.log('useEffect - getting location');
        setLocation(getLocation());
    }, []);

    const [sunTimes, setSunTimes] = useState('');

    useEffect(() => {
        getSunTimes(location)
            .then(data => {
                console.log(data);
                setSunTimes(data);
            })
            .catch(err => console.log(err));
    }, [location]);

    return (
        <>
            {sunTimes ? (
                <StyledSunTimes title='sunrise and sunset'>
                    <div>{sunTimes.sunrise}</div>
                    <div>{sunTimes.sunset}</div>
                </StyledSunTimes>
            ) : (
                <div>Loading</div>
            )}
        </>
    );
}
