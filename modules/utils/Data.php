<?php

namespace Utils;

/**
 * Class Data -- Utility static class for data related functions.
 * @package Utils
 */
class Data
{
    /**
     * @return array containing POST data as associative array.
     */
    public static function getPost(): array
    {
        return json_decode(file_get_contents("php://input"), true);
    }

    /**
     * @param string $name JSON file name.
     * @return array containing JSON data as associative array.
     */
    public static function getJSON(string $name): array
    {
        $path = $_SERVER["DOCUMENT_ROOT"] . "/data/$name.json";
        $json = file_get_contents($path, true);
        return json_decode($json, true);
    }

    /**
     * Sets updated data to a specified JSON file.
     * @param string $name JSON file name.
     * @param array $data containing updated JSON data.
     * @return bool true if written successfully, false otherwise.
     */
    public static function setJSON(string $name, array $data): bool
    {
        $json = json_encode($data);
        $result = file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/data/$name.json", $json);
        return $result > 0;
    }

    /**
     * @param string $name HTML file name.
     * @return string containing HTML content as string.
     */
    public static function getHTML(string $name): string
    {
        $path = $_SERVER["DOCUMENT_ROOT"] . "/$name.html";
        return file_get_contents($path);
    }

    /**
     * Sets updated content to a specified HTML file.
     * @param string $name HTML file name.
     * @param string $data containing updated HTML content.
     * @return bool true if written successfully, false otherwise.
     */
    public static function setHTML(string $name, string $data): bool
    {
        $result = file_put_contents($_SERVER["DOCUMENT_ROOT"] . "/$name.html", $data);
        return $result > 0;
    }
}