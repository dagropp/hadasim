import React from "react";
import VideoGallery from "react-component/videos/VideoGallery";
import {isInitialized, setData} from "common/utils";

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    componentDidMount() {
        setData.call(this, "videos", "/data/videos.json");
    }

    render() {
        const {videos} = this.state;

        return <section className="videos flex-col-centered" id="video">
            <h2>Videos</h2>
            {isInitialized(videos) && <VideoGallery videos={videos}/>}
        </section>
    }
}

export default Videos;