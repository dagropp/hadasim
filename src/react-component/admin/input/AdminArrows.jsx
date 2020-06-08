import React from "react";
import PropTypes from "prop-types";
import {moveEntryDownInArray, moveEntryUpInArray} from "common/array_utils";

/**
 * Component that moves project/gallery up/down.
 */
function AdminArrows(props) {
    const {data, updateData, index} = props;
    const firstChild = index === 0; // If first child, will not display arrow up.
    const lastChild = index === data.length - 1; // If last child, will not display arrow down.

    /**
     * Moves entry up.
     */
    function moveUp() {
        moveEntryUpInArray(data, index);
        updateData(data);
    }

    /**
     * Moves entry down.
     */
    function moveDown() {
        moveEntryDownInArray(data, index);
        updateData(data);
    }

    return <div className="admin-move-arrows flex-row-centered">
        <span className={`action flex-row-centered ${lastChild ? "disabled" : ""}`}
              onClick={moveDown}
              title="Move Gallery Down">
            <i className="icon-down flex-row-centered"/>
        </span>
        <span className={`action flex-row-centered ${firstChild ? "disabled" : ""}`}
              onClick={moveUp}
              title="Move Gallery Up">
            <i className="icon-up flex-row-centered"/>
        </span>
    </div>
}

AdminArrows.propTypes = {
    updateData: PropTypes.func,
    index: PropTypes.number
}

export default AdminArrows;