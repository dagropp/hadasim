import React from "react";
import {isInitialized} from "common/utils";

class ProjectID extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: window.btoa(Math.random().toString())
        }
    }

    render() {
        const {ID} = this.state;

        return isInitialized(ID) && <label htmlFor="id">
            <span>Project ID</span>
            <input type="text" name="id" readOnly={true} defaultValue={ID}/>
        </label>
    }
}

export default ProjectID;