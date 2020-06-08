/**
 * Checks if item is initialized (not null, undefined, "", [], {}).
 * @param value {any} to check if initialized.
 * @return {boolean} true if initialized, false otherwise.
 */
export function isInitialized(value) {
    return value !== null &&
        value !== undefined &&
        value !== "" &&
        (!(value.constructor === Array) || value.length > 0) &&
        (!(value.constructor === Object) || Object.keys(value).length > 0);
}

/**
 * Checks if any of the tested devices is used, based on screen width.
 * @param devices {...string} with devices names: desktop, tablet.landscape, tablet.portrait, phone.
 * @return {boolean} true if any of the devices is used.
 */
export function testDevice(...devices) {
    return devices.includes(detectDevice());

    function detectDevice() {
        const width = window.innerWidth;
        if (width > 1024) {
            return "desktop"
        } else if (width > 800) {
            return "tablet.landscape"
        } else if (width > 599) {
            return "tablet.portrait"
        } else {
            return "phone"
        }
    }
}

/**
 * Prompts window.confirm message, and if true executes callback function.
 * @param message {string} confirm message.
 * @param callback {function} to execute if confirmed.
 * @return {*} callback function value, if set.
 */
export function confirmAction(message, callback) {
    if (window.confirm(message)) {
        return callback();
    }
}

/**
 * Gets the query string if set, under hash-route.
 * @return {string} of the query, or empty string.
 */
export function getHashQuery() {
    return window.location.hash.split("?")[1] || "";
}