import React from "react";
import {Link} from "react-router-dom";

/**
 * Component with admin more actions menu.
 */
function MoreActionsMenu() {
    return <section className="admin-menu-section more-actions">
        <h2>More Actions</h2>
        <ul className="admin-menu-list">
            <li className="list-item">
                <h2>Contact Information</h2>
                <Link className="action flex-row-centered" to="/admin/edit_contact">Edit</Link>
            </li>
            <li className="list-item">
                <h2>Metadata</h2>
                <Link className="action flex-row-centered" to="/admin/edit_metadata">Edit</Link>
            </li>
        </ul>
    </section>
}

export default MoreActionsMenu;