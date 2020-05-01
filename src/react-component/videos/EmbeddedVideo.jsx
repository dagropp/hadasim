import React from "react";

function EmbeddedVideo(props) {
    const video = props.video;
    const style = {
        height: video.orientation === "landscape" ? `${450 * 9/16}px` : "",
        width: video.orientation === "landscape" ? "" : `${450 * 9/16}px`,
    }

    function parseUrl(url) {
        const phase1 = url.split("/");
        const phase2 = phase1[phase1.length - 1].split("=");
        return "https://www.youtube.com/embed/" + phase2[phase2.length - 1] + "?controls=0&autoplay=1";
    }

    return <div className={`embedded-video ${video.orientation}`} style={style}>
        <iframe src={parseUrl(video.url)} frameBorder="0" title="daniel">
            Your browser doesn't support iframe.
        </iframe>
    </div>
}

export default EmbeddedVideo;