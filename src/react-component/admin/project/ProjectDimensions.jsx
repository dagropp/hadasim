import React from "react";

/**
 * Component of project dimensions input.
 */
function ProjectDimensions(props) {
    /**
     * Allows only numbers on text input.
     * @param event {KeyboardEvent}
     */
    function allowOnlyNumbers(event) {
        const numbers = /[0-9.,]/;
        if (!numbers.test(event.key)) {
            event.preventDefault();
        }
    }

    const [height, width, depth] = props.project.dimensions;

    return <div className="project-dimensions admin-form-field">
        <span className="title optional">Project Dimensions</span>
        <div className="dimensions-wrapper">
            <input name="height"
                   type="text"
                   placeholder="Height [cm]"
                   pattern="[0-9.,]*"
                   defaultValue={height}
                   onKeyPress={allowOnlyNumbers}/>
            <input name="width"
                   type="text"
                   placeholder="Width [cm]"
                   pattern="[0-9.,]*"
                   defaultValue={width}
                   onKeyPress={allowOnlyNumbers}/>
            <input name="depth"
                   type="text"
                   placeholder="Depth [cm]"
                   pattern="[0-9.,]*"
                   defaultValue={depth}
                   onKeyPress={allowOnlyNumbers}/>
        </div>
    </div>
}

export default ProjectDimensions;