<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/App.php";
require_once "$ROOT/modules/utils/Data.php";
require_once "$ROOT/modules/utils/ArrayUtils.php";
require_once "$ROOT/modules/utils/files/FileUtils.php";

use Utils\App;
use Utils\Data;
use Utils\ArrayUtils;
use Utils\Files\FileUtils;

// Fetch and re-arrange data from $_POST and JSON.
list(
    "projects" => $projects,
    "id" => $id,
    "section" => $section
    ) = Data::getPost();

$sectionIndex = App::getGallerySectionIndex($section);
$gallery = Data::getJSON("gallery");
$gallery[$sectionIndex];
$projectGalleryIndexes = App::getProjectGalleryItemsIndexes($gallery[$sectionIndex], $id);
$items = $gallery[$sectionIndex]["items"];

// Delete all project images and remove from gallery.json
foreach ($projectGalleryIndexes as $index) {
    $src = $items[$index]["src"];
    FileUtils::deleteImage($src);
}
$gallery[$sectionIndex]["items"] = ArrayUtils::removeEntriesByKey($items, false, ...$projectGalleryIndexes);

// Set updated data
Data::setJSON("projects", $projects);
Data::setJSON("gallery", $gallery);

echo json_encode(["projects" => $projects, "gallery" => $gallery]);