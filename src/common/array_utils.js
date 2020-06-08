/**
 * Moves entry from current index to new index.
 * @param array {array} to move entry in.
 * @param currentIndex {number}
 * @param newIndex {number}
 */
export function moveEntryInArray(array, currentIndex, newIndex) {
    let item = array.splice(currentIndex, 1);
    array.splice(newIndex, 0, item[0]);
}

/**
 * Moves entry up.
 * @param array {array} to move entry in.
 * @param index {number}
 */
export function moveEntryUpInArray(array, index) {
    moveEntryInArray(array, index, index - 1);
}

/**
 * Moves entry down.
 * @param array {array} to move entry in.
 * @param index {number}
 */
export function moveEntryDownInArray(array, index) {
    moveEntryInArray(array, index, index + 1);
}

/**
 * Removes entry by index.
 * @param array {array} to remove entry from.
 * @param index {number}
 */
export function removeEntryFromArrayByIndex(array, index) {
    isArrayIndex(array, index) && array.splice(index, 1);
}

/**
 * @param array {array} to get index of.
 * @return {number} Random index of this array.
 */
export function randomIndexInArray(array) {
    return Math.floor(Math.random() * array.length);
}

/**
 * @param array {array} to get entry of.
 * @return {*} Random entry of this array.
 */
export function randomEntryInArray(array) {
    return array[randomIndexInArray(array)];
}

/**
 * @param array {array} to test.
 * @param index {number}
 * @return {boolean} true if index is in given array.
 */
function isArrayIndex(array, index) {
    return array[index] !== undefined;
}