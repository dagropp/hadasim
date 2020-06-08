import React from "react";
import AppHeader from "./AppHeader";
import MainExhibit from "./MainExhibit";
import Contact from "./Contact";
import ProjectsList from "./ProjectsList";
import Legal from "./Legal";
import {isInitialized, testDevice} from "common/app_utils";
import {setData} from "common/server_utils";
import Gallery from "./Gallery";
import SectionGifAnimation from "react-component/display/SectionGifAnimation";

/**
 * Main site component.
 */
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: {},
            gallery: [],
            info: {}
        }
        this.setData = setData.bind(this);
    }

    componentDidMount() {
        // Sets all data JSON's to state
        this.setData("projects");
        this.setData("gallery");
        this.setData("info");
    }

    render() {
        const {projects, gallery, info} = this.state;
        const isPhone = testDevice("phone", "tablet.portrait");

        return <>
            {isInitialized(gallery) && <AppHeader title={info.name} gallery={gallery} isPhone={isPhone}/>}
            <main className="app-wrapper">
                <MainExhibit title={info.name} isPhone={isPhone}/>
                {isInitialized(gallery) && gallery.map((section, index) =>
                    isInitialized(section.items) && section.show &&
                    <Gallery name={section.name} items={section.items} key={index}/>
                )}
                <section className="contact-and-list" id="contact">
                    <Contact/>
                    {isInitialized(projects) && isInitialized(gallery) &&
                    <ProjectsList projects={projects} gallery={gallery}/>}
                    <SectionGifAnimation/>
                </section>
            </main>
            <footer className="app-footer">
                <Legal isPhone={isPhone}/>
            </footer>
        </>
    }
}

export default Main;