<?php

namespace Utils\Files;

require_once "ProjectImage.php";

/**
 * Class ContactImage -- updates, resizes and writes contact image to server.
 * @package Utils\Files
 */
class ContactImage extends ProjectImage
{
    const PATH = "/assets/images/";

    /**
     * @return string of image relative path.
     */
    protected function setRelativePath(): string
    {
        return self::PATH;
    }

    /**
     * @return string containing contact image name.
     */
    protected function setName(): string
    {
        return "contact_image_" . rand(10000, 99999);
    }
}