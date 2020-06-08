<?php

namespace Utils;

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "Data.php";
require_once "ArrayUtils.php";
require_once "$ROOT/modules/utils/files/FileUtils.php";

use Utils\Files\FileUtils;

/**
 * Class App -- Utility static class for app related functions.
 * @package Utils
 */
class App
{
    /**
     * Delete media item from specified gallery.
     * @param array $galleryItems specified gallery items array.
     * @param int $itemIndex to delete.
     * @param string $src media src, to match to gallery entry.
     * @return array updated gallery items array.
     */
    public static function deleteGalleryImage(array $galleryItems, int $itemIndex, string $src)
    {
        FileUtils::deleteImage($src);
        return ArrayUtils::removeEntriesByKey($galleryItems, false, $itemIndex);
    }

    /**
     * @param string $section gallery section.
     * @return int of specified section index in gallery array.
     */
    public static function getGallerySectionIndex(string $section): int
    {
        $gallery = Data::getJSON("gallery");
        return ArrayUtils::findIndex($gallery, "name", $section);
    }

    /**
     * @param array $gallerySection specified gallery section.
     * @param string $src media src, to match to gallery entry.
     * @return int of matching item index in gallery items array.
     */
    public static function getGalleryItemIndex(array $gallerySection, string $src): int
    {
        return ArrayUtils::findIndex($gallerySection["items"], "src", $src);
    }

    /**
     * @param array $gallerySection specified gallery section.
     * @param string $id specified project id, to match to gallery entries.
     * @return array of matching item indexes in gallery items array.
     */
    public static function getProjectGalleryItemsIndexes(array $gallerySection, string $id): array
    {
        return ArrayUtils::findAllIndexes($gallerySection["items"], "projectId", $id);
    }

    /**
     * @param string $id specified project id
     * @return int of matching project index in projects array.
     */
    public static function getProjectIndex(string $id): int
    {
        $projects = Data::getJSON("projects");
        return ArrayUtils::findIndex($projects, "id", $id);
    }
}
