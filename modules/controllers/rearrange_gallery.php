<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";
require_once "$ROOT/modules/utils/files/FileUtils.php";

use Utils\Data;
use Utils\Files\FileUtils;

// Fetch and re-arrange data from $_POST and JSON.
list(
    "gallery" => $gallery,
    "section" => $section,
    "removeList" => $removeList
    ) = Data::getPost();

// delete files from the list and update gallery JSON.
foreach ($removeList as $src) {
    FileUtils::deleteImage($src);
}

// Write updated data to JSON.
echo Data::setJSON("gallery", $gallery);;