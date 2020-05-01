import React from "react";
import {isInitialized} from "../../common/utils";
import {useData} from "../../common/custom-hooks";

function Contact() {
    const info = useData("/data/info.json");

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

export default Contact;