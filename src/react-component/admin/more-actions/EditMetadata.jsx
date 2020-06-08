import React from "react";
import {postForm} from "common/server_utils";
import {resetStateArray} from "common/state_utils";
import {Redirect} from "react-router-dom";
import AdminTextInput from "react-component/admin/input/AdminTextInput";
import AdminTextArea from "react-component/admin/input/AdminTextArea";
import AdminSubmit from "react-component/admin/input/AdminSubmit";
import AdminMediaUpload from "react-component/admin/input/AdminMediaUpload";

/**
 * Component of admin edit metadata.
 */
class EditMetadata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            currentThumbs: []
        };
    }

    componentDidMount() {
        this.setCurrentThumbs();
    }

    /**
     * Sets current favicon thumbnail.
     */
    setCurrentThumbs() {
        const href = document.head.querySelector("link[rel='icon']").href;
        // Pushes favicon to {File}-like object.
        const currentThumbs = [{
            src: href,
            file: {name: href, type: "image"}
        }];
        this.setState({currentThumbs})
    }

    /**
     * Sends updated metadata to server.
     * @param event {Event} form submit event.
     */
    publish(event) {
        event.preventDefault();
        const controller = "update_metadata";
        const form = new FormData(event.target);
        // Sends form to server, if succeeds redirects and reloads, otherwise displays error message
        postForm(controller, form)
            .catch(error => window.alert(`ERROR\nCould not update metadata.\n${error}`))
            .finally(() => this.setState({redirect: true},
                () => window.location.reload()
            ));
    }

    render() {
        const {redirect, currentThumbs} = this.state;
        const defaultValues = {
            title: document.title,
            description: document.head.querySelector("meta[name='Description']").content,
            url: document.head.querySelector("link[rel='canonical']").href
        }

        return redirect
            ? <Redirect to="/admin" push={() => window.location.reload()}/>
            : <div className="admin-edit">
                <h1 className="centered">Edit Metadata</h1>
                <form className="admin-form flex-col-centered"
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      onSubmit={this.publish.bind(this)}>
                    <AdminTextInput name="title"
                                    title="Site Title"
                                    placeholder="Add document title..."
                                    defaultVal={defaultValues.title}
                                    required={true}/>
                    <AdminTextArea name="description"
                                   title="Site Description"
                                   placeholder="Add site description..."
                                   defaultVal={defaultValues.description}
                                   required={true}/>
                    <AdminTextInput name="url"
                                    title="Site URL"
                                    placeholder="Add site URL..."
                                    defaultVal={defaultValues.url}
                                    required={true}/>
                    <AdminMediaUpload name="favicon"
                                      title="Favicon [ICO File Only]"
                                      placeholder="Upload Favicon"
                                      required={false}
                                      multiple={false}
                                      currentThumbs={currentThumbs}
                                      resetList={resetStateArray.bind(this)}
                                      className="metadata-favicon"
                                      actions={false}
                                      approvedTypes={["image/x-icon"]}/>
                    <AdminSubmit title="Submit Changes" loaderTitle="Updating Metadata"/>
                </form>
            </div>
    }
}

export default EditMetadata;