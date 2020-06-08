/**
 * Posts JavaScript object to PHP controller in the server.
 * @param path {string} PHP controller name.
 * @param data {object} to send to controller.
 * @return {Promise<any>} of the returned data from server.
 */
export async function postData(path, data) {
    const response = await fetch(PATH.CONTROLLER(path), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        }
    );
    return await response.json();
}

/**
 * Posts form data to PHP controller in the server.
 * @param path {string} PHP controller name.
 * @param formData {FormData}
 * @return {Promise<any>} of the returned data from server.
 */
export async function postForm(path, formData) {
    const request = new Request(PATH.CONTROLLER(path), {
            method: "POST",
            body: formData
        }
    );
    const response = await fetch(request);
    return await response.json();
}

/**
 * Fetches data from JSON, and sets the data to a state with the same name.
 * @param path {string} JSON and state name.
 * @param callback {function} to perform after setState.
 */
export function setData(path, callback) {
    let result = {};
    fetchData(path).then(data => {
        result[path] = data;
        this.setState(result, callback);
    })
}

/**
 * Fetches data from the server.
 * @param path {string} JSON name.
 * @return {Promise<any>} of the JSON data.
 */
async function fetchData(path) {
    let request = await fetch(PATH.JSON(path));
    return await request.json();
}

const PATH = {
    /**
     * Reformat JSON path based on given name, and constant path.
     * @param path {string} JSON name.
     * @return {string} reformatted path.
     */
    JSON(path) {
        return `/data/${path}.json`;
    },
    /**
     * Reformat PHP controller path based on given name, and constant path.
     * @param path {string} PHP controller name.
     * @return {string} reformatted path.
     */
    CONTROLLER(path) {
        return `/modules/controllers/${path}.php`;
    }
}