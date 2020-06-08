<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/App.php";
require_once "$ROOT/modules/utils/Data.php";
require_once "$ROOT/modules/utils/StringUtils.php";
require_once "$ROOT/modules/utils/files/FileUtils.php";
require_once "$ROOT/modules/utils/files/ProjectImage.php";
require_once "$ROOT/modules/utils/files/ProjectVideo.php";

use Utils\App;
use Utils\Data;
use Utils\Files\ProjectImage;
use Utils\Files\ProjectVideo;
use Utils\StringUtils;
use Utils\Files\FileUtils;

// Fetch and re-arrange data from $_POST, $_FILES and JSON.
$project = [
    "id" => $_POST["id"],
    "title" => $_POST["title"],
    "gallery" => $_POST["gallery"],
    "date" => $_POST["date"],
    "technique" => $_POST["technique"],
    "dimensions" => [$_POST["height"], $_POST["width"], $_POST["depth"]],
];
$projects = Data::getJSON("projects");
$gallery = Data::getJSON("gallery");
$section = App::getGallerySectionIndex($project["gallery"]);
$projectIndex = App::getProjectIndex($_POST["id"]);
$mediaActions = json_decode($_POST["mediaActions"], true);

// Perform actions on existing files from projects, if set.
foreach ($mediaActions as $key => $action) {
    if ($action["current"]) {
        $src = base64_decode($key);
        $index = App::getGalleryItemIndex($gallery[$section], $src);
        $items = $gallery[$section]["items"];
        $item = $items[$index];
        if ($action["remove"]) {
            $gallery[$section]["items"] = App::deleteGalleryImage($items, $index, $src);
            continue;
        }
        $item["show"] = $action["show"];
        $item["credits"] = $action["credits"];
        $gallery[$section]["items"][$index] = $item;
    }
}

// Upload new files to project, and add it to Gallery JSON.
$files = $_FILES["media"]["error"][0] === 0 ? FileUtils::reformatFilesArray($_FILES["media"]) : null;
if ($files) {
    foreach ($files as $index => $file) {
        $show = true;
        $credits = "";
        $name = $file["name"];
        $key = base64_encode($name);
        if (isset($mediaActions[$key])) {
            $actions = $mediaActions[$key];
            if ($actions["remove"]) continue;
            $show = $actions["show"];
            $credits = $actions["credits"];
        }
        try {
            if (StringUtils::startsWith($file["type"], "image")) {
                $approvedTypes = ["image/png", "image/jpeg"];
                $item = new ProjectImage($file, $project, $show, $credits, $approvedTypes);
            } else if (StringUtils::startsWith($file["type"], "video")) {
                $approvedTypes = ["video/mp4"];
                $maxSize = 5000000;
                $item = new ProjectVideo($file, $project, $show, $credits, $approvedTypes, $maxSize);
            }
        } catch (Exception $e) {
            continue;
        }
        array_push($gallery[$section]["items"], $item->write());
    }
}

// Push new changes to projects.json or update current entry.
if ($projectIndex === -1) {
    array_push($projects, $project);
} else {
    $projects[$projectIndex] = $project;
}

// Write new/updated data to JSON.
Data::setJSON("projects", $projects);
Data::setJSON("gallery", $gallery);

echo json_encode(["projects" => $projects, "gallery" => $gallery]);