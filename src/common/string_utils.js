/**
 * Capitalize give string ("an example" => "An Example")
 * @param string {string}
 * @return {string}
 */
export function capitalize(string) {
    const words = string.split(" ");
    const result = []
    for (const word of words) {
        result.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return result.join(" ");
}