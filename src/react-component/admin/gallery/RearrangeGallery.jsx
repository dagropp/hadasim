import React from "react";
import {Redirect} from "react-router-dom";
import {getHashQuery, isInitialized} from "common/app_utils";
import {capitalize} from "common/string_utils";
import AdminSubmit from "react-component/admin/input/AdminSubmit";
import {addToStateArray} from "common/state_utils";
import {postData} from "common/server_utils";
import NonRefreshableComponent from "react-component/admin/input/NonRefreshableComponent";
import RearrangeImageGallery from "./RearrangeImageGallery";
import RearrangeVideoGallery from "./RearrangeVideoGallery";

/**
 * Component that rearranges general media gallery items, using drag-and-drop.
 */
class RearrangeGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionIndex: -1,
            items: [],
            currentlyDragging: null,
            removeList: [],
            redirect: false
        }
        this.section = getHashQuery();
    }

    componentDidMount() {
        const {gallery} = this.props;
        if (isInitialized(gallery)) {
            // Sets this gallery section index
            const sectionIndex = gallery.findIndex(entry => entry.name === this.section);
            const items = gallery[sectionIndex].items;
            this.setState({sectionIndex, items});
        }
    }

    /**
     * Sends updated gallery items array to server.
     * @param event {Event} form submit event.
     */
    publish(event) {
        event.preventDefault();
        const {sectionIndex, items, removeList} = this.state;
        const {gallery, setParentState} = this.props;
        gallery[sectionIndex].items = items;
        const data = {
            gallery: gallery,
            section: this.section,
            removeList: removeList
        };
        // Sends updated array to server and updates state, otherwise displays error message
        postData("rearrange_gallery", data)
            .then(() => setParentState({gallery}))
            .catch(error => window.alert(`ERROR\nCould not update gallery.\n${error}`))
            .finally(() => this.setState({redirect: true}))
    }

    /**
     * Sets to state the index of the item that is currently dragging.
     * @param index {number} of the currently dragged item.
     */
    setCurrentlyDragging(index) {
        this.setState({currentlyDragging: index})
    }

    /**
     * Updates the gallery items array.
     * @param update {array} of the gallery items.
     */
    updateItems(update) {
        this.setState({items: update})
    }

    render() {
        const {items, currentlyDragging, redirect} = this.state;
        const {gallery} = this.props;
        const props = {
            items,
            currentlyDragging,
            setCurrentlyDragging: this.setCurrentlyDragging.bind(this),
            updateItems: this.updateItems.bind(this),
            addToRemoveList: addToStateArray.bind(this)
        }

        return redirect || !isInitialized(gallery)
            ? <Redirect to="/admin"/>
            : <NonRefreshableComponent>
                <div className="admin-edit">
                    <h1>Rearrange {capitalize(this.section)} Gallery</h1>
                    <p>To rearrange items, drag and drop image to the desired position</p>
                    <form className="admin-form flex-col-centered"
                          action=""
                          method="post"
                          onSubmit={this.publish.bind(this)}>
                        {isInitialized(items) && this.section.startsWith("video")
                            ? <RearrangeVideoGallery {...props}/>
                            : <RearrangeImageGallery {...props}/>
                        }
                        <AdminSubmit title="Submit Changes" loaderTitle="Updating Gallery Data"/>
                    </form>
                </div>
            </NonRefreshableComponent>
    }
}

export default RearrangeGallery;