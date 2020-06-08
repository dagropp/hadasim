<?php

namespace Utils\Files;

require_once "Image.php";

/**
 * Class ContactImage -- updates, resizes and writes contact image to server.
 * @package Utils\Files
 */
class ContactImage
{
    const PATH = "/assets/images/contact_image";
    const LANDSCAPE = 300;
    const PORTRAIT = 400;

    private $image;

    /**
     * ContactImage constructor.
     * @param array $file $_FILES entry sent from form.
     */
    public function __construct(array $file)
    {
        $this->image = $file["tmp_name"];
    }

    /**
     * Writes and resizes the updated image to server.
     * @return array containing updated image parameters.
     */
    public function write(): array
    {
        $src = imagecreatefromstring(file_get_contents($this->image));
        $size = getimagesize($this->image);
        $ratio = $size[0] / $size[1];
        $params = $this->setSizeParams($ratio);
        $resize = Image::setResizedResource($src, $size, $params["width"], $params["height"]);
        Image::writeJPEG($resize, $_SERVER["DOCUMENT_ROOT"] . self::PATH . ".jpg");
        imagedestroy($src);
        return [
            "src" => self::PATH,
            "orientation" => $params["orientation"]
        ];
    }

    /**
     * Set image size parameters.
     * @param float $ratio image ratio.
     * @return array containing image orientation, height and width.
     */
    private function setSizeParams(float $ratio): array
    {
        $base = $ratio >= 1 ? self::LANDSCAPE : self::PORTRAIT;
        $orientation = $ratio >= 1 ? "landscape" : "portrait";

        return [
            "orientation" => $orientation,
            "height" => $base,
            "width" => $base * $ratio
        ];
    }
}