import React from "react";
import AppHeader from "./AppHeader";
import HomeExhibit from "./HomeExhibit";
import Sculptures from "./Sculptures";
import Paintings from "./Paintings";
import Videos from "./Videos";
import Contact from "./Contact";
import ProjectsList from "./ProjectsList";
import Legal from "./Legal";
import {isInitialized, setData, testDevice} from "common/utils";
import {Link} from "react-router-dom";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: {},
            gallery: {}
        }
        this.isPhone = testDevice("phone");
    }

    componentDidMount() {
        setData.call(this, "projects", "/data/projects.json");
        setData.call(this, "gallery", "/data/gallery.json");
    }

    render() {
        const {projects, gallery} = this.state;

        return <>
            <AppHeader isPhone={this.isPhone}/>
            <main className="app-wrapper">
                <HomeExhibit isPhone={this.isPhone}/>
                {isInitialized(projects) && isInitialized(gallery) && <>
                    <Sculptures projects={projects} gallery={gallery.sculptures}/>
                    <Paintings projects={projects} gallery={gallery.paintings}/>
                </>}
                <Videos/>
                <Contact/>
                {isInitialized(projects) && isInitialized(gallery) &&
                <ProjectsList projects={projects} gallery={gallery}/>}
            </main>
            <footer className="app-footer">
                <hr/>
                <Legal/>
                <Link to="/admin">Admin Page</Link>
            </footer>
        </>
    }
}

export default Main;