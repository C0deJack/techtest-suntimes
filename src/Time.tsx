import styled from 'styled-components';

const StyledSection = styled.section`
    h2 {
        font-size: 1.5rem;
        font-weight: 500;
    }

    img.icon {
        width: 100px;
    }

    time {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        text-transform: lowercase;
    }

    @media (min-width: 576px) {
        img.icon {
            width: 150px;
        }
    }
`;

interface Props {
    title: string;
    icon: string;
    time: string;
}

const Time = ({ title, icon, time }: Props): JSX.Element => {
    return (
        <StyledSection>
            <img className='icon' src={icon} />
            <time>{time}</time>
            <h2>{title}</h2>
        </StyledSection>
    );
};

export default Time;
