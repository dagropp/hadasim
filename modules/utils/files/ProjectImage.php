<?php

namespace Utils\Files;

require_once "ProjectMediaItem.php";
require_once "Image.php";

/**
 * Class ProjectImage -- parses, resizes and writes project image to server.
 * @package Utils\Files
 */
class ProjectImage extends ProjectMediaItem
{
    const PATH = "/assets/images/projects/";

    /**
     * Parses, resizes and writes all image versions (small, medium, large) to server.
     * @param string $data image tmp_name.
     * @param string $name image name.
     * @param array $size image width and height.
     * @param float $ratio image ratio.
     * @param array $path image write path.
     * @return bool true if written successfully, false otherwise.
     */
    protected function setMedia(string $data, string $name, array $size, float $ratio, array $path): bool
    {
        $src = imagecreatefromstring(file_get_contents($data));
        $params = self::setSizeParams($ratio);
        foreach ($params as $type => $param) {
            $resize = Image::setResizedResource($src, $size, $param["width"], $param["height"]);
            $write = Image::writeJPEG($resize, $path["absolute"] . "/$name=$type.jpg");
            if (!$write) {
                imagedestroy($src);
                return false;
            }
        }
        imagedestroy($src);
        return true;
    }

    /**
     * Set image size parameters.
     * @param float $ratio image ratio.
     * @return array containing image orientation, height and width.
     */
    private static function setSizeParams(float $ratio): array
    {
        $sizes = [1 => "small", 2 => "medium", 4 => "large"];
        $orientation = $ratio >= 1 ? "landscape" : "portrait";
        $base = $ratio >= 1 ? 400 : 500;
        $params = array();
        foreach ($sizes as $factor => $size) {
            $params[$size] = [
                "orientation" => $orientation,
                "height" => $base * $factor,
                "width" => $base * $factor * $ratio
            ];
        }
        return $params;
    }

    /**
     * @return string of image relative path.
     */
    protected function setRelativePath(): string
    {
        return self::PATH;
    }

    /**
     * @return string of image name.
     */
    protected function setFileName(): string
    {
        return explode(".", $this->getItem()["name"])[0];
    }

    /**
     * @return array of image width and height.
     */
    protected function setSize(): array
    {
        return getimagesize($this->getItem()["tmp_name"]);
    }
}