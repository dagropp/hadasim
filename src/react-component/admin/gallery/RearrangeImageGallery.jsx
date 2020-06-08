import React from "react";
import {isInitialized} from "common/app_utils";
import DraggableImage from "./DraggableImage";

/**
 * Component that rearranges image gallery items, using drag-and-drop.
 */
function RearrangeImageGallery(props) {
    const {items} = props;

    return <section className="gallery-wrapper admin-edit-gallery">
        <div className="image-gallery">
            {isInitialized(items) && items.map((item, index) => item.show &&
                <DraggableImage item={item} index={index} key={index} {...props}/>)}
        </div>
    </section>
}

export default RearrangeImageGallery;