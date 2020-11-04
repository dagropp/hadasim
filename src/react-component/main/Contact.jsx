import React from "react";
import {isInitialized} from "common/app_utils";
import {setData} from "common/server_utils";
import ImageZoom from "../images/ImageZoom";

/**
 * Component of contact information.
 */
class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
        setData.call(this, "info"); // Sets data JSON to state
    }

    render() {
        const {info} = this.state;

        return <div className="contact">
            <h2>Contact</h2>
            {isInitialized(info) &&
            <>
                <div className={`media-item ${info.image.orientation}`}>
                    <ImageZoom image={info.image}/>
                </div>
                <ul className="info-list flex-col-centered">
                    <li>
                        <a href={`mailto:${info.email}`}>{info.email}</a>
                    </li>
                    {Object.entries(info.social).map(([platform, link], index) =>
                        link && <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className={`social-${platform}`}>
                                <i className={`icon-${platform}`}/> {platform}
                            </a>
                        </li>
                    )}
                </ul>
            </>
            }
        </div>
    }

}

export default Contact;