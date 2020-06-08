import React, {useState} from "react";
import PropTypes from "prop-types";
import AdminTextInput from "react-component/admin/input/AdminTextInput";
import AdminSubmit from "react-component/admin/input/AdminSubmit";
import {postForm} from "common/server_utils";
import {Redirect} from "react-router-dom";
import {capitalize} from "common/string_utils";

/**
 * Component that creates new and empty gallery.
 */
function NewGallery(props) {
    const [redirect, setRedirect] = useState(false);
    const {gallery, setParentState} = props;

    /**
     * Checks if the new gallery name is unique.
     * @param event {Event} input change event.
     */
    function validateTitle(event) {
        const title = event.target.value;
        if (gallery.findIndex(entry => entry.name.toLowerCase() === title.toLowerCase()) !== -1) {
            event.target.setCustomValidity(`'${capitalize(title)}' gallery already exists`);
        } else {
            event.target.setCustomValidity("");
        }
    }

    /**
     * Sends new gallery information to server.
     * @param event {Event} form submit event.
     */
    function publish(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        // Sends form to server, if succeeds updates JSON, otherwise displays error message
        postForm("new_gallery", form)
            .then(response => setParentState({...response}))
            .catch(error => window.alert(`ERROR\nCould not create gallery.\n${error}`))
            .finally(() => setRedirect(true));
    }

    return redirect
        ? <Redirect to="/admin"/>
        : <div className="admin-edit">
            <h1 className="centered">Add New Gallery</h1>
            <form className="admin-form flex-col-centered" method="post" onSubmit={publish}>
                <AdminTextInput name="title"
                                title="Gallery Title"
                                placeholder="Add title..."
                                required={true}
                                changeFunc={validateTitle}/>
                <AdminSubmit title="Create Gallery" loaderTitle="Creating New Gallery"/>
            </form>
        </div>
}

NewGallery.propTypes = {
    gallery: PropTypes.array,
    setParentState: PropTypes.func
}

export default NewGallery;