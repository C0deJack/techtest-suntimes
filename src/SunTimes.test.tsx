import renderer from 'react-test-renderer';
import SunTimes from './SunTimes';

test('SunTimes renders correctly', () => {
    const sunTimes = renderer.create(<SunTimes />).toJSON();
    expect(sunTimes).toMatchSnapshot();
});
