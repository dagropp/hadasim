import React from "react";
import {Redirect} from "react-router-dom";
import {getHashQuery, isInitialized} from "common/app_utils";
import {postForm} from "common/server_utils";
import ProjectMedia from "./ProjectMedia";
import ProjectDate from "./ProjectDate";
import ProjectGallery from "./ProjectGallery";
import ProjectTitle from "./ProjectTitle";
import ProjectId from "./ProjectId";
import ProjectDimensions from "./ProjectDimensions";
import AdminSubmit from "react-component/admin/input/AdminSubmit";
import ProjectTechnique from "./ProjectTechnique";
import NonRefreshableComponent from "react-component/admin/input/NonRefreshableComponent";

/**
 * Component of admin edit / add project.
 */
class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            mediaActions: {},
            edit: false,
            redirect: false
        }
    }

    componentDidMount() {
        this.setProject();
    }

    /**
     * Initializes project object.
     */
    setProject() {
        const {projects} = this.props;
        const query = getHashQuery();
        let project;
        // If query is set, assigns project with query index to state.
        if (query) {
            project = projects[query];
            this.setState({edit: true});
            // Otherwise, initializes an empty project to state.
        } else {
            project = {
                id: this.setId(),
                title: "",
                gallery: "",
                date: new Date().getFullYear(),
                dimensions: ["", "", ""],
            };
        }
        this.setState({project});
    }

    /**
     * Sets random and unique project ID.
     * @return {string} of project ID.
     */
    setId() {
        const {projects} = this.props;
        const projectIds = projects.map(entry => entry.id);
        let id = "";
        // Creates a random string ID, when found unique ID, breaks loop and returns it
        while (true) {
            id = window.btoa(Math.random().toString()).substring(0, 10);
            if (!projectIds.includes(id)) {
                break;
            }
        }
        return id;
    }

    /**
     * Sets array to pass to server with further actions to perform on uploaded media files.
     * @param file {File|object} representing file to perform actions on.
     * @param current {boolean} true if file already in project, false if new file.
     * @param property {string} action property to set (remove, show, credits).
     * @param value {any} for the action.
     */
    setMediaActions(file, current, property, value) {
        const mediaActions = {...this.state.mediaActions}
        const key = window.btoa(file.name);
        if (!Object.keys(mediaActions).includes(key)) {
            mediaActions[key] = {
                current: current,
                remove: false,
                show: true,
                credits: ""
            };
        }
        mediaActions[key][property] = value;
        this.setState({mediaActions});
    }

    /**
     * Sends new / updated project to server.
     * @param event {Event} form submit event.
     */
    publish(event) {
        event.preventDefault();
        const {project, mediaActions} = this.state;
        const {setParentState} = this.props;
        const form = new FormData(event.target);
        form.append("mediaActions", JSON.stringify(mediaActions));
        form.set("gallery", form.get("gallery") || project.gallery);
        // Sends form to server, if succeeds updates JSON, otherwise displays error message
        postForm("edit_project", form)
            .then(response => setParentState({...response}))
            .catch(error => window.alert(`ERROR\nCould not write project.\n${error}`))
            .finally(() => this.setState({redirect: true}));
    }

    render() {
        const {edit, project, redirect, mediaActions} = this.state;
        const {projects, gallery} = this.props;
        const props = {...this.state, gallery}

        return redirect || (!isInitialized(projects) && !isInitialized(gallery))
            ? <Redirect to="/admin"/>
            : isInitialized(project) && <NonRefreshableComponent>
            <div className="admin-edit">
                <h1 className="centered">{edit ? "Edit Project" : "New Project"}</h1>
                <form className="admin-form flex-col-centered"
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      onSubmit={this.publish.bind(this)}>
                    <ProjectId {...props}/>
                    <ProjectTitle {...props}/>
                    <ProjectGallery {...props}/>
                    <ProjectDate {...props}/>
                    <ProjectTechnique {...props}/>
                    <ProjectDimensions {...props}/>
                    <ProjectMedia {...props} mediaActions={[mediaActions, this.setMediaActions.bind(this)]}/>
                    <AdminSubmit title={edit ? "Submit Changes" : "Submit Project"}
                                 loaderTitle={edit ? "Updating Project Data" : "Posting Project Data"}/>
                </form>
            </div>
        </NonRefreshableComponent>
    }
}

export default EditProject;