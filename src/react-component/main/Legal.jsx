import React from "react";
import {Link} from "react-router-dom";

/**
 * Component of legal data in footer.
 */
function Legal(props) {
    const year = new Date().getFullYear();
    const {isPhone} = props;

    return <ul className="legal centered">
        <li className="bold">© {year} Hadas Golan</li>
        <li>Built by <a className="underline" href="https://www.dgropp.com" target="_blank"
                        rel="noopener noreferrer">Daniel Gropp</a>
            &nbsp;/ Check it out on <a className="underline" href="https://github.com/dagropp/hadasim" target="_blank"
                                       rel="noopener noreferrer">GitHub</a>
        </li>
        {!isPhone && <li className="admin-link">
            <Link className="underline" to="/admin">Admin Page</Link>
        </li>}
    </ul>
}

export default Legal;