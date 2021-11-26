import loadingSvg from './assets/loading.svg';
import { ReactElement } from 'react';

const Loading = (): ReactElement => {
    return (
        <div>
            <h3>LOADING</h3>
            <img alt='loading icon' src={loadingSvg} />
        </div>
    );
};

export default Loading;
