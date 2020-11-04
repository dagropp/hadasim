<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";
require_once "$ROOT/modules/utils/files/ContactImage.php";
require_once "$ROOT/modules/utils/files/FileUtils.php";

use Utils\Data;
use Utils\Files\ContactImage;
use Utils\Files\FileUtils;

// Fetch and re-arrange data from $_POST and $_FILES.
$info = Data::getJSON("info");
$update = [
    "name" => $_POST["name"],
    "email" => $_POST["email"],
    "image" => $info["image"],
    "social" => [
        "behance" => $_POST["behance"],
        "facebook" => $_POST["facebook"],
        "instagram" => $_POST["instagram"],
        "pinterest" => $_POST["pinterest"],
        "twitter" => $_POST["twitter"],
        "vimeo" => $_POST["vimeo"],
        "whatsapp" => $_POST["whatsapp"],
        "youtube" => $_POST["youtube"],
        "other" => $_POST["other"]
    ]
];

// Write new image if set.
if (isset($_FILES["image"]) && $_FILES["image"]["error"] === 0) {
    $metaData = ["id" => "", "gallery" => "", "title" => "Contact Image"];
    $approvedTypes = ["image/png", "image/jpeg"];
    try {
        $image = new ContactImage($_FILES["image"], $metaData, true, "", "", $approvedTypes);
        $update["image"] = $image->write();
        FileUtils::deleteImage($info["image"]["src"]);
    } catch (Exception $e) {
        $update["image"] = $info["image"];
    }
}

// Set updated data.
Data::setJSON("info", $update);

echo json_encode(["info" => $update]);