import {isInitialized} from "./app_utils";

/**
 * Parses project dimensions array to readable string.
 * @param dimensions {array}
 * @return {string} of the pattern "<width>x<height>x<depth> cm".
 */
export function parseDimensions(dimensions) {
    const filtered = dimensions.filter(entry => entry);
    return isInitialized(filtered)
        ? dimensions.filter(entry => entry).join("x") + " cm"
        : "";
}

/**
 * Isolates gallery items to arrays, by project.
 * @param items {array}
 * @return {array} of the isolated gallery items.
 */
export function isolateProjectsToArrays(items) {
    const result = {};
    items.forEach((item, index) => {
        result[item.projectId]
            ? result[item.projectId].items.push(item)
            : result[item.projectId] = {items: [item], index};
    })
    return Object.values(result)
        .sort((a, b) => a.index - b.index)
        .map(entry => entry.items);
}