import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import getLocation from './getLocation';
import getSunTimes, { SunTimesType } from './getSunTimes';
import sunriseIcon from './assets/sunrise.png';
import sunsetIcon from './assets/sunset.png';
import Loading from './loading';
import Time from './Time';
import BackgroundImage from './BackgroundImage';

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sunTimes, setSunTimes] = useState<SunTimesType | '' | any>('');

    useEffect(() => {
        getSunTimes(location)
            .then(data => {
                setSunTimes(data);
            })
            .catch(err => console.log(err));
    }, [location]);

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

            {sunTimes && <BackgroundImage sunTimes={sunTimes} />}
        </StyledSunTimes>
    );
}
