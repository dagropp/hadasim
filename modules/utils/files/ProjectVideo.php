<?php

namespace Utils\Files;

$ROOT = $_SERVER["DOCUMENT_ROOT"];

require_once "ProjectMediaItem.php";
require_once "$ROOT/modules/libs/getid3/getid3.php";

use getID3;
use Exception;

/**
 * Class ProjectVideo -- parses and writes project video to server.
 * @package Utils\Files
 */
class ProjectVideo extends ProjectMediaItem
{
    const PATH = "/assets/videos/projects/";

    /**
     * ProjectVideo constructor.
     * @param array $item $_FILES entry sent from form.
     * @param array $project project to write video to.
     * @param bool $show true to show video in gallery, false otherwise.
     * @param string $credits if set, add credits to video.
     * @param array $approvedTypes which types are OK to write.
     * @param int $byteSizeLimit what is the max video size in bytes.
     * @throws Exception if file size is bigger than specified byteSizeLimit.
     */
    public function __construct(array $item, array $project, bool $show, string $credits, array $approvedTypes, int $byteSizeLimit)
    {
        parent::__construct($item, $project, $show, $credits, $approvedTypes);
        if (filesize($item["tmp_name"]) > $byteSizeLimit) {
            throw new Exception("Max file size 5MB");
        }
    }

    /**
     * @param string $data video tmp_name.
     * @param string $name video name.
     * @param array $size video width and height
     * @param float $ratio video ratio.
     * @param array $path video write path
     * @return bool true if written successfully, false otherwise.
     */
    protected function setMedia(string $data, string $name, array $size, float $ratio, array $path): bool
    {
        $content = file_get_contents($data);
        $write = file_put_contents($path["absolute"] . "/$name", $content);
        return $write > 0;
    }

    /**
     * @return array of video width and height.
     */
    protected function setSize(): array
    {
        $getID3 = new getID3();
        $analyze = $getID3->analyze($this->getItem()["tmp_name"]);
        $video = $analyze["video"];
        return [$video["resolution_x"], $video["resolution_y"]];
    }

    /**
     * @return string of video relative path.
     */
    protected function setRelativePath(): string
    {
        return self::PATH;
    }

    /**
     * @return string of item name.
     */
    protected function setFileName(): string
    {
        return $this->getItem()["name"];
    }
}