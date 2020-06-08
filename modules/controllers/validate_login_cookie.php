<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/Data.php";
require_once "$ROOT/modules/utils/AdminDataBase.php";

use Utils\Data;
use Utils\AdminDataBase;

// Fetch and re-arrange data from $_POST.
list("cookie" => $cookie) = Data::getPost();

// Create new data-base connection and find cookie admin entry if exists.
$db = new AdminDataBase();
$admin = $db->findUserByCookie($cookie);

// Set found data and return it
$loggedIn = $admin !== null;
$user = $loggedIn ? $admin["name"] : "";

echo json_encode(["loggedIn" => $loggedIn, "user" => $user]);
