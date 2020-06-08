<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";

use Utils\Data;

// Fetch and re-arrange data from $_POST and JSON.
$gallery = Data::getJSON("gallery");
$update = [
    "name" => strtolower($_POST["title"]),
    "show" => true,
    "items" => array()
];
array_push($gallery, $update);
// Set updated data
Data::setJSON("gallery", $gallery);

echo json_encode(["gallery" => $gallery]);