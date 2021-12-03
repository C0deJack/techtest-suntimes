import styled from 'styled-components';
import dayImage from './assets/day.jpg';
import nightImage from './assets/night.jpg';
import { SunTimesType } from './getSunTimes';

const StyledImg = styled.img`
    position: absolute;
    z-index: -1;
    min-height: 100vh;
    min-width: 100vw;
    top: 0;
    left: 0;
    background-color: #000000b3; // Backup background colour.
`;

interface Props {
    sunTimes: SunTimesType;
}

const BackgroundImage = ({ sunTimes }: Props): JSX.Element => {
    function isDay(sunTimes: SunTimesType) {
        const now = new Date();
        const hour = now.getHours();

        if (!sunTimes) return true;

        return (
            hour > parseInt(sunTimes.sunrise.substring(0, 1)) &&
            hour < parseInt(sunTimes.sunset.substring(0, 1)) + 12
        );
    }

    const backgroundImage = isDay(sunTimes) ? dayImage : nightImage;

    return <StyledImg src={backgroundImage ? backgroundImage : ''} />;
};

export default BackgroundImage;
