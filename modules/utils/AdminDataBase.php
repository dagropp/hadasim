<?php

namespace Utils;

use mysqli;

/**
 * Class AdminDataBase -- Connects to admin database.
 * @package Utils
 */
class AdminDataBase
{
    const SERVER_NAME = ""; // hidden
    const USER = ""; // hidden
    const PASSWORD = ""; // hidden
    const DB_NAME = ""; // hidden

    private $connection;

    /**
     * AdminDataBase constructor.
     */
    public function __construct()
    {
        $this->connection = self::setConnection();
    }

    /**
     * General mySQL data-base connection method.
     * @return mysqli|null - mysqli connection object if successful, null if failed.
     */
    private static function setConnection(): ?mysqli
    {
        $connection = new mysqli(self::SERVER_NAME, self::USER, self::PASSWORD, self::DB_NAME);
        $connection->set_charset('utf8');
        return $connection->connect_error ? null : $connection;
    }

    /**
     * Gets admin data by given email and password.
     * @param string $email given admin email
     * @param string $password given admin password
     * @return array|null of admin data if found and verified password, or null otherwise.
     */
    public function getData(string $email, string $password): ?array
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $sql = "SELECT * FROM admin WHERE email = '$email'";
            $query = $this->connection->query($sql);
            $admin = $query->fetch_assoc();
            $verify = password_verify($password, $admin["password"]);
            return $verify ? $admin : null;
        }
        return null;
    }

    /**
     * Gets admin data by cookie.
     * @param $cookie string containing login credentials saved as password_hash($email, $hashed_password).
     * @return array|null of admin data if found, or null otherwise.
     */
    public function findUserByCookie(string $cookie): ?array
    {
        $sql = "SELECT * FROM admin";
        $query = $this->connection->query($sql);
        while ($row = $query->fetch_assoc()) {
            if (password_verify($row["email"] . $row["password"], $cookie)) {
                return $row;
            }
        }
        return null;
    }
}