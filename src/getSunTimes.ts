import getData from './helpers/getData';
import { Location } from './getLocation';
import appSettings from './appconfig.json';
const settings = appSettings;

export default function getSunTimes<T>(location: Location): Promise<T> {
    console.log('getting sunTimes');
    const url = `${settings.api.sunTimesByLatLon}lat=${location.lat}&lng=${location.lon}`;

    return getData(url)
        .then(data => {
            console.log('SunTimesType', data);
            return data.results;
        })
        .catch(err => console.log(err));
}

export type SunTimesType = {
    sunrise: string,
    sunset: string,
};
