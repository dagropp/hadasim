import React from "react";
import BackToTopButton from "./BackToTopButton";
import {Link as ScrollLink} from "react-scroll";
import PropTypes from "prop-types";
import {capitalize} from "common/string_utils";
import {isInitialized} from "common/app_utils";

/**
 * Component of app sticky header.
 */
class AppHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        }
        this.element = React.createRef();
    }

    componentDidMount() {
        // Sets scroll offset to dynamic header height
        this.setState({height: this.element.current.clientHeight});
    }

    render() {
        const {title, gallery, isPhone} = this.props;
        const {height} = this.state;
        const scrollSettings = {
            spy: true,
            smooth: true,
            offset: -(height + 20),
            duration: 500,
            activeClass: "active"
        };

        return <header className="app-header" ref={this.element}>
            <nav className="app-menu">
                <h1><ScrollLink to="home" {...scrollSettings}>{title}</ScrollLink></h1>
                <ul className="menu-list">
                    {gallery.map((section, index) =>
                        section.show && isInitialized(section.items) && <li key={index}>
                            <ScrollLink to={section.name} {...scrollSettings}>
                                {capitalize(section.name)}
                            </ScrollLink>
                        </li>
                    )}
                    <li><ScrollLink to="contact" {...scrollSettings}>Contact</ScrollLink></li>
                </ul>
            </nav>
            {isPhone && <BackToTopButton settings={scrollSettings}/>}
        </header>
    }
}

AppHeader.propTypes = {
    title: PropTypes.string,
    gallery: PropTypes.array,
    isPhone: PropTypes.bool
}

export default AppHeader;