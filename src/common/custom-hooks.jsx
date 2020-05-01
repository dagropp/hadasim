import {useState, useEffect, useRef} from "react";
import {isInitialized} from "./utils";

export function useData(path) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(path)
            .then(data => setData(data));

        async function fetchData(path) {
            let request = await fetch(path);
            return await request.json();
        }
    }, [path]);

    return data;
}

export function useDimensions(dependency) {
    const element = useRef();
    const [dimensions, setDimensions] = useState({});
    useEffect(() => {
        if (isInitialized(element.current)) {
            const elementDimensions = element.current.getBoundingClientRect();
            setDimensions(elementDimensions.toJSON());
        }
    }, [dependency])

    return [element, dimensions];
}