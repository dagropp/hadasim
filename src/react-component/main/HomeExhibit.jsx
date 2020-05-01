import React from "react";

function HomeExhibit(props) {
    async function playVideo(event) {
        const video = event.target;
        try {
            await video.play();
        } catch (e) {
            console.log(e.message);
            video.controls = true;
        }
    }

    return <section className="home-exhibit flex-col-centered" id="home">
        {props.isPhone && <h1 className="centered">Hadas Golan</h1>}
        <video className="exhibit-video"
               loop={true}
               playsInline={true}
               muted={true}
               preload="false"
               onCanPlay={playVideo}>
            <source src="/assets/videos/main_compressed.mp4" type="video/mp4"/>
            <source src="/assets/videos/main_compressed.webm" type="video/webm"/>
            <p>Your browser doesn't support embedded videos</p>
        </video>
    </section>

}

export default HomeExhibit;
