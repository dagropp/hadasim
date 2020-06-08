import React from "react";
import {Link} from "react-router-dom";
import {confirmAction, isInitialized} from "common/app_utils";
import {capitalize} from "common/string_utils";
import AdminArrows from "./input/AdminArrows";
import {postData} from "common/server_utils";
import {removeEntryFromArrayByIndex} from "common/array_utils";

/**
 * Component with admin main gallery menu.
 */
function GalleryMenu(props) {
    const {gallery, setParentState} = props;

    /**
     * Toggles gallery between show/hide.
     * @param index {number} of gallery to toggle.
     */
    function toggleGallery(index) {
        gallery[index].show = !gallery[index].show;
        updateGallery(gallery);
    }

    /**
     * Deletes gallery (only for empty galleries).
     * @param name {string} of gallery to delete.
     * @param index {number} of gallery to delete.
     */
    function deleteGallery(name, index) {
        const message = `Are you sure you want to delete '${capitalize(name)}' gallery?`;
        confirmAction(message, () => {
            removeEntryFromArrayByIndex(gallery, index);
            updateGallery(gallery);
        });
    }

    /**
     * Updates gallery in server and sets the state accordingly.
     * @param gallery {object} of gallery to update.
     */
    function updateGallery(gallery) {
        const data = {path: "gallery", update: gallery};
        postData("update_json", data)
            .then(() => setParentState({gallery}))
            .catch(console.warn);
    }

    return <section className="admin-menu-section gallery">
        <h2>Galleries <span role="img" aria-label="Camera">📸</span></h2>
        <ul className="admin-menu-list">
            <li className="list-item new">
                <Link to="/admin/new_gallery">
                    <h2>Add New Gallery</h2>
                </Link>
            </li>
            {isInitialized(gallery) && gallery.map((section, index) =>
                <li className="list-item" key={index}>
                    <h2>{capitalize(section.name)}</h2>
                    <Link className="action flex-row-centered"
                          to={{pathname: "/admin/edit_gallery", search: section.name}}>Rearrange</Link>
                    <span className={`action ${section.show ? "negative" : "positive"} flex-row-centered`}
                          onClick={toggleGallery.bind(this, index)}>
                            {section.show ? "Hide" : "Show"}</span>
                    {!isInitialized(section.items) &&
                    <span className="action delete flex-row-centered negative"
                          onClick={deleteGallery.bind(this, section.name, index)}>Delete</span>}
                    <AdminArrows index={index} data={gallery} updateData={updateGallery}/>
                </li>
            )}
        </ul>
    </section>
}

export default GalleryMenu;