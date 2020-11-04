import React from "react";
import AdminMediaUpload from "react-component/admin/input/AdminMediaUpload";
import {resetStateArray} from "common/state_utils";

/**
 * Component of contact image upload input.
 */
class ContactImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentThumbs: []
        }
    }

    componentDidMount() {
        this.setCurrentThumbs();
    }

    /**
     * Sets contact's current image thumbnail.
     */
    setCurrentThumbs() {
        const {info} = this.props;
        const currentThumbs = [];
        // Pushes contact image to {File}-like object.
        info.image.src && currentThumbs.push({
            src: `${info.image.src}=small.jpg`,
            file: {name: info.image.src, type: "image"}
        });
        this.setState({currentThumbs})
    }

    render() {
        const {currentThumbs} = this.state;
        const approvedTypes = ["image/png", "image/jpeg"];

        return <AdminMediaUpload name="image"
                                 title="Contact Image"
                                 placeholder="Upload Contact Image"
                                 required={false}
                                 multiple={false}
                                 currentThumbs={currentThumbs}
                                 resetList={resetStateArray.bind(this)}
                                 actions={false}
                                 approvedTypes={approvedTypes}/>
    }
}

export default ContactImage;