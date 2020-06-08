import React from "react";
import PropTypes from "prop-types";
import AdminTextInput from "./input/AdminTextInput";
import AdminSubmit from "./input/AdminSubmit";
import {postForm} from "common/server_utils";
import {resetState} from "common/state_utils";
import {setCookie} from "common/cookie_utils";

/**
 * Component with admin login interface.
 */
class AdminLogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restart: false,
            message: ""
        }
    }

    /**
     * Attempts to login to admin site.
     * @param event {Event} form submit event.
     */
    login(event) {
        event.preventDefault();
        resetState(this);
        const form = new FormData(event.target);
        const {setParentState} = this.props;
        // Sends form to server, if succeeds sets user states and cookie and redirect, otherwise displays message
        postForm("admin_login", form)
            .then(response => {
                const {loggedIn, user, cookie} = response;
                if (loggedIn) {
                    setCookie("admin_credentials", cookie);
                    setParentState({loggedIn, user});
                } else {
                    this.setState({
                        restart: true,
                        message: "Admin credentials are false, try again"
                    })
                }
            })
            .catch(() => this.setState({
                restart: true,
                message: "Failed to connect to database, contact admin"
            }));
    }

    render() {
        const {restart, message} = this.state;

        return <div className="admin-edit">
            <h1 className="centered">Log In to Admin Page <span role="img" aria-label="Stop!">✋</span></h1>
            <form className="admin-form flex-col-centered" method="post" onSubmit={this.login.bind(this)}>
                <AdminTextInput required={true}
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                title="Email"/>
                <AdminTextInput required={true}
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                title="Password"/>
                {message && <span className="login-fail-message">{message}</span>}
                <AdminSubmit title="Log In" loaderTitle="Validating credentials" restart={restart}/>
            </form>
        </div>
    }
}

AdminLogIn.propTypes = {
    setStatus: PropTypes.func
};

export default AdminLogIn;