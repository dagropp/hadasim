import React, {useEffect, useState} from "react";
import ImageZoom from "react-component/images/ImageZoom";
import LocalVideo from "./LocalVideo";
import {isInitialized} from "common/app_utils";
import {isolateProjectsToArrays} from "common/project_utils";

/**
 * Component of video gallery.
 */
function VideoGallery(props) {
    const [items, setItems] = useState({});
    const {gallery} = props;

    useEffect(() => {
        const items = isolateProjectsToArrays(gallery);
        setItems(items);
    }, [gallery, setItems])

    return <div className="video-gallery flex-col-centered">
        <a className="disclaimer link-like" href="mailto:hadasim.g@gmail.com" target="_blank" rel="noreferrer noopener">
            Send request to watch full videos</a>
        {isInitialized(items) && items.map((project, index) =>
            <div className="image-gallery" key={index}>
                {project.map((item, i) => item.show &&
                    <div className={`gallery-item ${item.orientation} ${item.size}`} key={index.toString() + i}>
                        {item.type === "image"
                            ? <ImageZoom image={item}/>
                            : <LocalVideo src={item.src} autoplay={true} key={index}/>
                        }
                    </div>
                )}
            </div>
        )}
    </div>
}

export default VideoGallery;