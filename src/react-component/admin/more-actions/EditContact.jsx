import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {isInitialized} from "common/app_utils";
import AdminTextInput from "react-component/admin/input/AdminTextInput";
import {capitalize} from "common/string_utils";
import ContactImage from "./ContactImage";
import AdminSubmit from "react-component/admin/input/AdminSubmit";
import {postForm} from "common/server_utils";

/**
 * Component of admin edit contact information.
 */
function EditContact(props) {
    const [redirect, setRedirect] = useState(false);
    const {info, setParentState} = props;

    /**
     * Sends updated contact information to server.
     * @param event {Event} form submit event.
     */
    function publish(event) {
        event.preventDefault();
        const controller = "update_contact_info";
        const form = new FormData(event.target);
        // Sends form to server, if succeeds updates JSON, otherwise displays error message
        postForm(controller, form)
            .then(response => setParentState({...response}))
            .catch(error => window.alert(`ERROR\nCould not update contact information.\n${error}`))
            .finally(() => setRedirect(true));
    }

    return redirect
        ? <Redirect to="/admin"/>
        : isInitialized(info) && <div className="admin-edit">
        <h1 className="centered">Edit Contact Information</h1>
        <form className="admin-form flex-col-centered"
              action=""
              method="post"
              encType="multipart/form-data"
              onSubmit={publish}>
            <AdminTextInput name="name"
                            title="Name"
                            placeholder="Add Name..."
                            required={true}
                            defaultVal={info.name}/>
            <AdminTextInput name="email"
                            title="Email"
                            placeholder="Add Email..."
                            required={true}
                            defaultVal={info.email}
                            type="email"/>
            <ContactImage info={info}/>
            <div className="contact-social admin-form-field">
                <span className="title">Social Networks</span>
                {Object.entries(info.social).map(([platform, link], index) =>
                    <AdminTextInput name={platform}
                                    title={capitalize(platform)}
                                    placeholder={`Add ${capitalize(platform)} Profile...`}
                                    required={false}
                                    defaultVal={link}
                                    className="social-item"
                                    key={index}/>
                )}
            </div>
            <AdminSubmit title="Submit Changes" loaderTitle="Updating Contact Information"/>
        </form>
    </div>
}

export default EditContact;