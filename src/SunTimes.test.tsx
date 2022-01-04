// import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import getLocation from './getLocation';
import SunTimes from './SunTimes';
// import { shallow } from 'enzyme';

// describe('<SunTimes />', () => {
//     it('Calls getLocation on mount', () => {
//         renderer.act(<SunTimes />);
//     });
// });

import { mount } from 'enzyme';

// describe('<SunTimes />', () => {
//     test('should call getLocation on mount', () => {
//         const spy = jest.spyOn(SunTimes.prototype, 'getLocation');
//         mount(<SunTimes />);
//         expect(spy).toHaveBeenCalledTimes(1);
//     });
// });

import { act } from 'react-dom/test-utils';

test('setInitialData fn is called in useEffect hook in the provider', async () => {
    let debug;
    await act(async () => {
        debug = render(<SunTimes />).debug;
    });

    expect(getLocation).toHaveBeenCalled();
});
