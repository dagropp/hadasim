export function parseDate(date) {
    let month = date.month
        ? "-" + date.month.padStart(2, 0)
        : "";
    return date.year + month;
}

export function parsePlaces(places) {
    return places.join(", ");
}