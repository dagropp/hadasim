<?php

namespace Utils;

/**
 * Class StringUtils -- Utility static class for string related functions.
 * @package Utils
 */
class StringUtils
{
    /**
     * @param string $string full string to test.
     * @param string $value to check if full string starts with.
     * @return bool true if string starts with value, false otherwise.
     */
    public static function startsWith(string $string, string $value)
    {
        return strpos($string, $value) === 0;
    }
}