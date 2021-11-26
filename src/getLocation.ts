export default function getLocation(): Location {
    console.log('getting location');

    // Set a fallback of London.
    const location: Location = {
        lat: '51.2',
        lon: '0.12',
    };

    const handleFoundLocation = (data: GeolocationPosition) => {
        location.lat = data.coords.latitude.toString();
        location.lon = data.coords.longitude.toString();
    };

    const handleError = (err: GeolocationPositionError) => {
        // get by IP address
        console.log('geo failed 2 - get by ip');
        console.log(err);
    };

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
            handleFoundLocation,
            handleError
        );
    } else {
        // get by IP address
        console.log('geo failed 1- get by ip');
    }

    return location;
}

export type Location = {
    lat: string,
    lon: string,
};
