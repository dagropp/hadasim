<?php

namespace Utils\Files;

/**
 * Class FileUtils -- Utility static class for file related functions.
 * @package Utils\Files
 */
class FileUtils
{
    /**
     * Deletes a list of files from the server.
     * @param string ...$files to delete.
     */
    public static function deleteFiles(string ...$files): void
    {
        foreach ($files as $file) {
            $file = $_SERVER["DOCUMENT_ROOT"] . "/" . $file;
            file_exists($file) && unlink($file);
        }
    }

    /**
     * Deletes all versions of an image from the server.
     * @param string $image to delete.
     */
    public static function deleteImage(string $image): void
    {
        self::deleteFiles("$image=small.jpg", "$image=large.jpg");
    }

    /**
     * Reformat the $_FILES array sent from form.
     * @param array $files $_FILES array sent from form.
     * @return array of the reformatted files.
     */
    static function reformatFilesArray(array $files): array
    {
        $result = [];
        if (!is_array($files["name"])) {
            return [$files];
        }
        foreach ($files as $key => $all) {
            foreach ($all as $i => $val) {
                $result[$i][$key] = $val;
            }
        }
        return $result;
    }

}