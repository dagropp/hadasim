<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";

use Utils\Data;

// Fetch and re-arrange data from $_POST and HTML files.
list("title" => $title, "description" => $description, "url" => $url) = $_POST;
$html = Data::getHTML("index");

// Replace relevant items in HTML file.
$actions = [
    [
        "pattern" => '/<title>(.*?)<\/title>/',
        "replacement" => "<title>$title</title>"
    ],
    [
        "pattern" => "/<meta name=\"Description\" content=\"(.*?)\">/",
        "replacement" => "<meta name=\"Description\" content=\"$description\">"],
    [
        "pattern" => "/<link rel=\"canonical\" href=\"(.*?)\">/",
        "replacement" => "<link rel=\"canonical\" href=\"$url\">"
    ]
];
foreach ($actions as $action) {
    $html = preg_replace($action["pattern"], $action["replacement"], $html);
}

// Write new favicon if set.
if (isset($_FILES["favicon"]) && $_FILES["favicon"]["error"] === 0 && $_FILES["favicon"]["type"] === "image/x-icon") {
    $image = file_get_contents($_FILES["favicon"]["tmp_name"]);
    $path = $ROOT . "/assets/images/favicon.ico";
    file_put_contents($path, $image);
}

// Set updated HTML file.
echo Data::setHTML("index", $html);