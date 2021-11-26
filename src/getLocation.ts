import getData from './helpers/getData';

export default async function getLocation(): Promise<Location> {
    // Set a fallback of London.
    let location: Location = {
        lat: '51.2',
        lon: '0.12',
    };

    if (window.navigator.geolocation) {
        location = getLocationByGeolocation();
    } else {
        location = await getLocationByIp();
    }

    return location;
}

function getLocationByGeolocation(): Location {
    let location: Location;

    const handleFoundLocation = (data: GeolocationPosition) => {
        location.lat = data.coords.latitude.toString();
        location.lon = data.coords.longitude.toString();
    };

    const handleError = (err: GeolocationPositionError) => {
        getLocationByIp();
        console.log(err);
    };

    window.navigator.geolocation.getCurrentPosition(
        handleFoundLocation,
        handleError
    );

    return {
        lat: '0',
        lon: '0',
    };
}

function getLocationByIp(): Promise<Location> {
    return getData('http://ip-api.com/json')
        .then(data => {
            return {
                lat: data.lat,
                lon: data.lon,
            };
        })
        .catch();
}

export type Location = {
    lat: string,
    lon: string,
};
