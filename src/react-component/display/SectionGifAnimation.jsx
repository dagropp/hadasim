import React from "react";
import {setSectionGifAnimation} from "common/gif_utils";

/**
 * Component of GIF animation for each section.
 */
function SectionGifAnimation() {
    const [top, bottom] = setSectionGifAnimation();

    return <>
        <img className="gif-line-drop top" src={top} alt="LED line drop animation"/>
        <img className="gif-line-drop bottom" src={bottom} alt="LED line drop animation"/>
    </>
}

export default SectionGifAnimation;