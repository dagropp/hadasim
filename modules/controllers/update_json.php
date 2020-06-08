<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";

use Utils\Data;

// Fetch and re-arrange data from $_POST.
list ("path" => $path, "update" => $update) = Data::getPost();

// Set updated JSON.
echo Data::setJSON($path, $update);