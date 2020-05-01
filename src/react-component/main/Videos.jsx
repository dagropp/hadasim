import React from "react";
import VideoGallery from "../videos/VideoGallery";
import {useData} from "../../common/custom-hooks";
import {isInitialized} from "../../common/utils";

function Videos(props) {
    const videos = useData("/data/videos.json");

    return <section className="videos flex-col-centered" id="video">
        <h2>Videos</h2>
        {isInitialized(videos) && <VideoGallery videos={videos}/>}
    </section>
}

export default Videos;