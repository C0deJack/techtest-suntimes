import getData from './helpers/getData';

export default function getLocation(setLocation: SetLocationType): void {
    if (window.navigator.geolocation) {
        getLocationByGeolocation(setLocation);
    } else {
        getLocationByIp(setLocation);
    }
}

function getLocationByGeolocation(setLocation: SetLocationType): void {
    const handleFoundLocation = (data: GeolocationPosition) => {
        setLocation({
            lat: data.coords.latitude.toString(),
            lon: data.coords.longitude.toString(),
        });
    };

    const handleError = (err: GeolocationPositionError) => {
        getLocationByIp(setLocation);
        console.log(err);
    };

    window.navigator.geolocation.getCurrentPosition(
        handleFoundLocation,
        handleError
    );
}

function getLocationByIp(setLocation: SetLocationType): void {
    getData('http://ip-api.com/json')
        .then(data => {
            setLocation({
                lat: data.lat,
                lon: data.lon,
            });
        })
        .catch();
}

type SetLocationType = React.Dispatch<
    React.SetStateAction<{
        lat: string,
        lon: string,
    }>
>;

export type Location = {
    lat: string,
    lon: string,
};
