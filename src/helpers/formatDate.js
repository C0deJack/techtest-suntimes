export default function formatDate(utcDate) {
    const passedDate = new Date(utcDate);

    var newDate = new Date(
        passedDate.getTime() + passedDate.getTimezoneOffset() * 60 * 1000
    );

    var offset = passedDate.getTimezoneOffset() / 60;
    var hours = passedDate.getHours();

    newDate.setHours(hours + offset);

    return newDate.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
}
