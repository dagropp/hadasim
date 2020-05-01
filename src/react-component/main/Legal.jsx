import React from "react";

function Legal() {
    const year = new Date().getFullYear();

    return <ul className="legal centered">
        <li>© {year} Hadas Golan</li>
        <li>Built by&nbsp;
            <a className="underline"
               href="https://www.dgropp.com"
               target="_blank"
               rel="noopener noreferrer">Daniel Gropp</a>
            &nbsp;with <a className="underline"
                          href="https://reactjs.org/"
                          target="_blank"
                          rel="noopener noreferrer">React</a>,&nbsp;
            <a className="underline"
               href="https://www.php.net/"
               target="_blank"
               rel="noopener noreferrer">PHP</a>
            &nbsp;and <a className="underline"
                         href="https://sass-lang.com/"
                         target="_blank"
                         rel="noopener noreferrer">Sass</a>
        </li>
        <li>Font icons by&nbsp;
            <a className="underline"
               href="https://fontawesome.com/"
               target="_blank"
               rel="noopener noreferrer">Font Awesome</a>
            &nbsp;© 2016 Dave Gandy
        </li>
    </ul>
}

export default Legal;