<?php

namespace Utils\Files;

use Exception;

/**
 * Class ProjectMediaItem -- abstract general class to write and format project media items to server.
 * @package Utils\Files
 */
abstract class ProjectMediaItem
{
    private $item;
    private $id;
    private $title;
    private $gallery;
    private $show;
    private $credits;
    private $tag;

    /**
     * ProjectMediaItem constructor.
     * @param array $item $_FILES entry sent from form.
     * @param array $project project to write media to.
     * @param bool $show true to show item in gallery, false otherwise.
     * @param string $credits if set, add credits to media item.
     * @param string $tag if set, add tag to media item.
     * @param array $approvedTypes which types are OK to write.
     * @throws Exception if file type is not found in approvedTypes array.
     */
    public function __construct(array $item, array $project, bool $show, string $credits, string $tag, array $approvedTypes)
    {
        if (!in_array($item["type"], $approvedTypes)) {
            throw new Exception("File type is not supported");
        }
        $this->item = $item;
        $this->id = $project["id"];
        $this->title = $project["title"];
        $this->gallery = $project["gallery"];
        $this->show = $show;
        $this->credits = $credits;
        $this->tag = $tag;
    }

    /**
     * Writes general media item to server, using setMedia() abstract function, defined in children classes.
     * @return array containing all relevant item data, to write to gallery items array.
     */
    public function write(): array
    {
        $data = $this->item["tmp_name"];
        $name = $this->setName();
        $size = $this->setSize();
        $ratio = $size[0] / $size[1];
        $type = explode("/", $this->item["type"])[0];
        $path = $this->setPath();
        $this->setMedia($data, $name, $size, $ratio, $path);
        return [
            "projectId" => $this->id,
            "title" => $this->title,
            "type" => $type,
            "src" => $path["relative"] . $name,
            "orientation" => $ratio >= 1 ? "landscape" : "portrait",
            "ratio" => $ratio,
            "size" => "normal",
            "show" => $this->show,
            "credits" => $this->credits,
            "tag" => $this->tag
        ];
    }

    /**
     * @return array of $_FILES entry sent from form.
     */
    protected function getItem(): array
    {
        return $this->item;
    }

    /**
     * @return array containing absolute and relative paths, based on specifics defined in children classes.
     */
    private function setPath(): array
    {
        $relative = $this->setRelativePath();
        $absolute = $_SERVER["DOCUMENT_ROOT"] . $relative;
        return ["relative" => $relative, "absolute" => $absolute];
    }

    /**
     * @return string containing media item name, based on specifics defined in children classes.
     */
    protected function setName(): string
    {
        $fileName = $this->setFileName();
        return $this->gallery . "__" . $this->id . "__" . $fileName;
    }

    /**
     * Parses, resizes and writes media item to server.
     * @param string $data item tmp_name.
     * @param string $name item name.
     * @param array $size item width and height
     * @param float $ratio item ratio.
     * @param array $path item write path
     * @return bool true if written successfully, false otherwise.
     */
    protected abstract function setMedia(string $data, string $name, array $size, float $ratio, array $path): bool;

    /**
     * @return array of item width and height.
     */
    protected abstract function setSize(): array;

    /**
     * @return string of item relative path.
     */
    protected abstract function setRelativePath(): string;

    /**
     * @return string of item name.
     */
    protected abstract function setFileName(): string;
}