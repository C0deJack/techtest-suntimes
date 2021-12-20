import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Time from './Time';

const testProps = {
    timeInput: '4:45:58 AM',
    timeOutput: '4:45AM',
    title: 'testTitle',
    titleRole: 'testTitle time',
    icon: 'testIconUrl',
};

test('Time component snapshot', () => {
    const time = renderer
        .create(
            <Time
                title={testProps.title}
                time={testProps.timeInput}
                icon={testProps.icon}
            />
        )
        .toJSON();
    expect(time).toMatchSnapshot();
});

describe('Time output', () => {
    beforeEach(() => {
        render(
            <Time
                title={testProps.title}
                time={testProps.timeInput}
                icon={testProps.icon}
            />
        );
    });

    test('Time renders the correct title', () => {
        const time = screen.getByText(/testTitle/i);
        expect(time).toBeInTheDocument();
    });

    test('Time renders the correct time', () => {
        const time = screen.getByRole('time', {
            name: new RegExp(testProps.title, 'i'),
        });
        expect(time).toBeInTheDocument();
        expect(time).toHaveTextContent(testProps.timeOutput);
    });
});
