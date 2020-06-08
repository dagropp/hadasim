import {useEffect} from "react";

/**
 * Wrapper component for any component that should not be refreshed without warning.
 */
function NonRefreshableComponent(props) {
    useEffect(() => {
        window.onbeforeunload = event => {
            // Sets refresh warning
            event.preventDefault();
            event.returnValue = "";
            return "";
        }
        return () => window.onbeforeunload = null;
    }, [])

    return props.children;
}

export default NonRefreshableComponent;