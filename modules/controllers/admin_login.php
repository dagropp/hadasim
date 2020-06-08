<?php

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "$ROOT/modules/utils/AdminDataBase.php";

use Utils\AdminDataBase;

// Fetch and re-arrange data from $_POST.
list("email" => $email, "password" => $password) = $_POST;

// Create new data-base connection and find admin entry that fits email + password if exists.
$db = new AdminDataBase();
$admin = $db->getData($email, $password);
$loggedIn = $admin !== null;

// Set found data and return it
$user = $loggedIn ? $admin["name"] : "";
$cookie = $loggedIn ? password_hash($admin["email"] . $admin["password"], PASSWORD_DEFAULT) : null;

echo json_encode(["loggedIn" => $loggedIn, "user" => $user, "cookie" => $cookie]);