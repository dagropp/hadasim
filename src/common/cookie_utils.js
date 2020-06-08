/**
 * Sets new cookie, with simple localStorage like interface.
 * @param key {string}
 * @param value {string}
 */
export function setCookie(key, value) {
    const MAX_DAYS = 365 * 3600 * 24;
    document.cookie = `${key}=${value}; Max-Age=${MAX_DAYS}; Secure=true`;
}

/**
 * Gets specified cookie, with simple localStorage like interface.
 * @param key {string}
 * @return {null|string} cookie value, or null if not found.
 */
export function getCookie(key) {
    for (const cookie of parseCookies()) {
        const entry = Object.entries(cookie)[0];
        if (entry[0] === key) {
            return entry[1];
        }
    }
    return null;
}

/**
 * Removes cookie, with simple localStorage like interface, while actually only setting cookie value to empty string.
 * @param key {string}
 */
export function removeCookie(key) {
    setCookie(key, "");
}

/**
 * Parses this document cookies to a workable object.
 * @return {object} containing this document cookies.
 */
function parseCookies() {
    const cookies = document.cookie.split(" ").join("").split(";");
    const pairs = [];
    const results = [];
    cookies.forEach(cookie =>
        pairs.push(cookie.split("="))
    );
    for (let [key, val] of pairs) {
        let obj = {};
        obj[key] = val;
        results.push(obj);
    }
    return results;
}