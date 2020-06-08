import React from "react";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {removeCookie} from "common/cookie_utils";

/**
 * Component with admin actions nav bar.
 */
class AdminNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    /**
     * Logs out of admin site, and removes login cookie.
     */
    logout() {
        const {setParentState} = this.props;
        removeCookie("admin_credentials");
        setParentState({loggedIn: false, user: ""})
    }

    /**
     * Redirects to main site and refreshes.
     */
    goHome() {
        this.setState({redirect: true},
            () => window.location.reload());
    }

    render() {
        const {loggedIn} = this.props;
        const {redirect} = this.state;
        return redirect
            ? <Redirect to="/"/>
            : <nav className="admin-nav-bar">
                <ul className="nav-list flex-row-centered">
                    <li className="link-like" onClick={this.goHome.bind(this)}>
                        <i className="icon-back"/> Back to Site
                    </li>
                    {loggedIn && <li className="link-like" onClick={this.logout.bind(this)}>
                        Log Out <i className="icon-logout"/>
                    </li>}
                </ul>
            </nav>
    }

}

AdminNavBar.propTypes = {
    loggedIn: PropTypes.bool,
    setParentState: PropTypes.func
}
AdminNavBar.defaultProps = {
    setParentState: null
}

export default AdminNavBar;