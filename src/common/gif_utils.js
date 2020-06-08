import {useEffect, useState} from "react";
import {randomEntryInArray} from "./array_utils";

/**
 * Creates a custom hook for gallery gif animations.
 * @param items {array} of gallery media items.
 * @return {object} animations state.
 */
export function useGalleryGifAnimation(items) {
    const [animations, setAnimations] = useState({});
    useEffect(() => {
        const path = "/assets/images/icons/";
        const sources = ["dot_v1", "dot_v2", "dot_v3", "line_v1", "line_v2", "line_v3", "line_v4", "line_v5", "line_v6"];
        const positions = ["top", "middle", "bottom"];
        const result = Array(items.length);
        // Sets random animation src and position for each gallery index.
        for (let i = 0; i <= items.length; i++) {
            const src = path + randomEntryInArray(sources) + ".gif";
            const position = randomEntryInArray(positions);
            result[i] = {src, position};
        }

        setAnimations(result);
    }, [items])

    return animations;
}

/**
 * Sets gif animation for each site section.
 * @return {array}
 */
export function setSectionGifAnimation() {
    const path = "/assets/images/icons/";
    const sources = ["line_v2", "line_v4", "line_v5", "line_v6"];
    const result = [];
    for (let i = 0; i <= 2; i++) {
        while (true) {
            const src = setSrc();
            if (!result.includes(src)) {
                result[i] = src;
                break;
            }
        }
    }
    return result;

    /**
     * @return {string} of random src.
     */
    function setSrc() {
        return path + randomEntryInArray(sources) + ".gif"
    }
}