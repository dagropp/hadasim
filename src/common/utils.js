import {detect} from "detect-browser";

export function isInitialized(value) {
    return value !== null &&
        value !== undefined &&
        value !== "" &&
        (!(value.constructor === Array) || value.length > 0) &&
        (!(value.constructor === Object) || Object.keys(value).length > 0);
}

export function setImageGallery(...projects) {
    let gallery = [];
    for (const project of projects) {
        const title = project.title;
        const subtitle = project.subtitle;
        const date = project.date;
        for (const image of project.media) {
            const imageSrc = image.src;
            const webp = {large: `${imageSrc}=large.webp`}
            const jpg = {large: `${imageSrc}=large.jpg`};
            const orientation = image.orientation;
            gallery.push({title, subtitle, date, webp, jpg, orientation})
        }
    }
    return gallery;
}

export function testDevice(...devices) {
    return devices.includes(detectDevice());

    function detectDevice() {
        const width = window.innerWidth;
        if (width > 1024) {
            return "desktop"
        } else if (width > 800) {
            return "tablet.landscape"
        } else if (width > 599) {
            return "tablet.portrait"
        } else {
            return "phone"
        }
    }
}

export function testBrowser(...browsers) {
    const browser = detect();
    return browsers.includes(browser.name);
}

export function testFeature(testedFeature) {
    const featuresList = parseSearchValues() || {};
    if (Object.keys(featuresList).includes(testedFeature.name)) {
        return featuresList[testedFeature.name] === "1";
    } else {
        return testedFeature.default;
    }

    function parseSearchValues() {
        const searchValues = window.location.search.split("?");
        let features = {};
        for (const value of searchValues) {
            if (value) {
                const feature = value.split("=");
                features[feature[0]] = feature[1];
            }
        }
        return features;
    }
}