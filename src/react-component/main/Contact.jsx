import React from "react";
import {isInitialized, setData} from "common/utils";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
        setData.call(this, "info", "/data/info.json");
    }

    render() {
        const {info} = this.state;

        return <section className="contact" id="contact">
            <h2>Contact</h2>
            {isInitialized(info) && <ul className="info-list flex-col-centered">
                <li>
                    <a href={`mailto:${info.email}`}>{info.email}</a>
                </li>
                {Object.entries(info.social).map(([platform, link], index) =>
                    link && <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <i className={`icon-${platform}`}></i> {platform}
                        </a>
                    </li>
                )}
            </ul>}
        </section>
    }

}

export default Contact;