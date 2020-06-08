import React from "react";
import {Route, Switch} from "react-router-dom";
import ProjectsMenu from "./ProjectsMenu";
import GalleryMenu from "./GalleryMenu";
import MoreActionsMenu from "./MoreActionsMenu";
import EditProject from "./project";
import EditContact from "./more-actions/EditContact";
import NewGallery from "./gallery/NewGallery";
import RearrangeGallery from "./gallery/RearrangeGallery";
import AdminLogIn from "./AdminLogIn";
import EditMetadata from "./more-actions/EditMetadata";
import {postData, setData} from "common/server_utils";
import AdminNavBar from "./AdminNavBar";
import {getCookie} from "common/cookie_utils";

/**
 * Main site admin component.
 */
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            loggedIn: false,
            projects: [],
            gallery: [],
            info: {}
        }
        this.setData = setData.bind(this);
        this.setParentState = this.setParentState.bind(this);
    }

    componentDidMount() {
        // Sets all data JSON's to state
        this.setData("projects");
        this.setData("gallery");
        this.setData("info");
        this.checkLoginCookie();
    }

    /**
     * Sets this component state, and passed to children.
     * @param value {object} to set to state.
     */
    setParentState(value) {
        this.setState(value);
    }

    /**
     * Checks for login credentials cookie, and if set verifies it and acts accordingly.
     */
    checkLoginCookie() {
        const cookie = getCookie("admin_credentials");
        postData("validate_login_cookie", {cookie})
            .then(response => {
                const {loggedIn, user} = response;
                loggedIn && this.setState({loggedIn, user});
            })
            .catch(console.warn)
    }

    render() {
        const {loggedIn, user, projects, gallery, info} = this.state;
        const setParentState = this.setParentState.bind(this);
        const props = {projects, gallery, info, setParentState};

        return <div className="admin-wrapper flex-col-centered">
            <AdminNavBar loggedIn={loggedIn} setParentState={setParentState}/>
            {!loggedIn
                ? <AdminLogIn setParentState={setParentState}/> // If not logged in shows LogIn component
                : <Switch>
                    <Route exact path="/admin">
                        <main className="admin-menu">
                            <h1 className="centered">Hi {user} <span role="img"
                                                                     aria-label="Live Long and Prosper">🖖</span>
                            </h1>
                            <GalleryMenu {...props}/>
                            <ProjectsMenu {...props}/>
                            <MoreActionsMenu/>
                        </main>
                    </Route>
                    <Route path="/admin/edit_project"><EditProject {...props}/></Route>
                    <Route path="/admin/new_gallery"><NewGallery {...props}/></Route>
                    <Route path="/admin/edit_gallery"><RearrangeGallery {...props}/></Route>
                    <Route path="/admin/edit_contact"><EditContact {...props}/></Route>
                    <Route path="/admin/edit_metadata" component={EditMetadata}/>
                </Switch>
            }
        </div>
    }
}

export default Admin;