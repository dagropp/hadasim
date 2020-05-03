import React from "react";
import EmbeddedVideo from "./EmbeddedVideo";
import {isInitialized} from "common/utils";

function VideoGallery(props) {
    const videos = props.videos;

    return <div className="video-gallery flex-col-centered">
        {isInitialized(videos) && videos.map((video, index) =>
            <EmbeddedVideo video={video} key={index}/>
        )}
    </div>
}

export default VideoGallery;