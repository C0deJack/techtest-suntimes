import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import getLocation from './getLocation';
import getSunTimes, { SunTimesType } from './getSunTimes';
import dayImage from './assets/day.jpg';
import nightImage from './assets/night.jpg';
import sunriseIcon from './assets/sunrise.png';
import sunsetIcon from './assets/sunset.png';
import Loading from './loading';

const StyledSunTimes = styled.div`
    overflow: hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
    min-width: 100%;
    color: #000;

    div.sunrise {
        background-color: rgba(255, 255, 255, 0.7);
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 60vw;
        min-width: 230px;
        border-radius: 2rem;
        padding: 3rem;
    }

    hr {
        height: 2px;
        background-color: #000;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 500;
    }

    img.background {
        position: absolute;
        z-index: -1;
        min-height: 100vh;
        min-width: 100vw;
        top: 0;
        left: 0;
        background-color: #000000b3; // Backup background colour.
    }

    div.time {
        font-size: 2rem;
        font-weight: 700;
        text-transform: lowercase;
    }

    img.icon {
        width: 100px;
    }

    @media (min-width: 576px) {
        div.sunrise {
            width: 50vw;
        }

        img.icon {
            width: 150px;
        }
    }
`;

export default function SunTimes(): ReactElement {
    const [location, setLocation] = useState({
        lat: '',
        lon: '',
    });

    useEffect(() => {
        getLocation()
            .then(data => {
                setLocation(data);
            })
            .catch(err => console.log(err));
    }, []);

    const [sunTimes, setSunTimes] = useState<SunTimesType | '' | any>('');

    useEffect(() => {
        getSunTimes(location)
            .then(data => {
                setSunTimes(data);
            })
            .catch(err => console.log(err));
    }, [location]);

    const isDay = true;

    const backgroundImage = isDay ? dayImage : nightImage;

    return (
        <StyledSunTimes>
            <div className='sunrise' title='sunrise and sunset'>
                {sunTimes ? (
                    <>
                        <img className='icon' src={sunriseIcon} />
                        <div className='time'>{sunTimes.sunrise}</div>
                        <h2>Sunrise</h2>
                        <hr />
                        <img className='icon' src={sunsetIcon} />
                        <div className='time'>{sunTimes.sunset}</div>
                        <h2>Sunset</h2>
                    </>
                ) : (
                    <Loading />
                )}
            </div>

            <img
                className='background'
                src={backgroundImage ? backgroundImage : ''}
            />
        </StyledSunTimes>
    );
}
