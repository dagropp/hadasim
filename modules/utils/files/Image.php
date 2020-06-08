<?php

namespace Utils\Files;

/**
 * Class Image -- Utility static class for image related functions.
 * @package Utils\Files
 */
class Image
{
    /**
     * @param $src *image resource created from imagecreatefromstring() function.
     * @param array $size width and height of source image.
     * @param float $width of resized image.
     * @param float $height of resized image.
     * @return false|resource of resized image.
     */
    public static function setResizedResource($src, array $size, float $width, float $height)
    {
        $resource = imagecreatetruecolor($width, $height);
        imagecopyresampled($resource, $src, 0, 0, 0, 0, $width, $height, $size[0], $size[1]);
        return $resource;
    }

    /**
     * Writes JPEG image file to server.
     * @param $resource *image resource created from imagecopyresampled() function.
     * @param string $path to write image to.
     * @return bool true if written successfully, false otherwise.
     */
    public static function writeJPEG($resource, string $path): bool
    {
        $jpeg = imagejpeg($resource, $path);
        imagedestroy($resource);
        return $jpeg;
    }

}