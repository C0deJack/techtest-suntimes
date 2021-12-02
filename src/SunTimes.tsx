import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import getLocation from './getLocation';
import getSunTimes, { SunTimesType } from './getSunTimes';
import dayImage from './assets/day.jpg';
import nightImage from './assets/night.jpg';
import sunriseIcon from './assets/sunrise.png';
import sunsetIcon from './assets/sunset.png';
import Loading from './loading';
import Time from './Time';

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

    img.background {
        position: absolute;
        z-index: -1;
        min-height: 100vh;
        min-width: 100vw;
        top: 0;
        left: 0;
        background-color: #000000b3; // Backup background colour.
    }

    @media (min-width: 576px) {
        div.sunrise {
            width: 50vw;
        }
    }
`;

export default function SunTimes(): ReactElement {
    const [location, setLocation] = useState({
        lat: '',
        lon: '',
    });

    useEffect(() => {
        getLocation(setLocation);
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
                        <Time
                            title={'Sunrise'}
                            icon={sunriseIcon}
                            time={sunTimes.sunrise}
                        />
                        <hr />
                        <Time
                            title={'Sunset'}
                            icon={sunsetIcon}
                            time={sunTimes.sunset}
                        />
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
