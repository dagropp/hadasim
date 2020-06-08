/**
 * Reset all state of given component to its initial value, by type.
 * @param thisArg of the component.
 */
export function resetState(thisArg) {
    const keys = Object.entries(thisArg.state);
    for (const [key, value] of keys) {
        const state = {};
        state[key] = setTypedValue(value)
        thisArg.setState(state);
    }

    function setTypedValue(value) {
        switch (typeof value) {
            case "number":
                return 0;
            case "string":
                return "";
            case "boolean":
                return false;
            case "object":
                return Array.isArray(value) ? [] : {};
            default:
                return null;
        }
    }
}

/**
 * Adds item to specified array state.
 * @param key {string} of state key.
 * @param item
 */
export function addToStateArray(key, item) {
    const state = {};
    state[key] = [...this.state[key], item];
    this.setState(state);
}

/**
 * Resets specified array state.
 * @param key {string} of state key.
 */
export function resetStateArray(key) {
    const state = {};
    state[key] = [];
    this.setState(state);
}