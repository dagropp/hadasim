<?php

namespace Utils;

/**
 * Class ArrayUtils -- Utility static class for array related functions.
 * @package Utils
 */
class ArrayUtils
{
    /**
     * Removes entries from array by keys.
     * @param array $array to remove entries from.
     * @param bool $assoc true to return associative array, false to return numeric array.
     * @param int|string ...$keys to remove from array.
     * @return array updated array, without the removed entries.
     */
    public static function removeEntriesByKey(array $array, bool $assoc, ...$keys)
    {
        foreach ($keys as $key) {
            if (in_array($key, array_keys($array))) {
                unset($array[$key]);
            }
        }
        return $assoc ? $array : array_values($array);
    }

    /**
     * Finds index of a property's value in array of associative arrays.
     * @param array $array to find index in.
     * @param string $property to compare value at.
     * @param string $value to check in property.
     * @return int index of property's value.
     */
    public static function findIndex(array $array, string $property, string $value): int
    {
        foreach ($array as $index => $entry) {
            if ($entry[$property] === $value) {
                return $index;
            }
        }
        return -1;
    }

    /**
     * Finds all indexes of a property's value in array of associative arrays.
     * @param array $array to find indexes in.
     * @param string $property to compare value at.
     * @param string $value to check in property.
     * @return array of all indexes of property's value.
     */
    public static function findAllIndexes(array $array, string $property, string $value): array
    {
        $result = array();
        foreach ($array as $index => $entry) {
            if ($entry[$property] === $value) {
                array_push($result, $index);
            }
        }
        return $result;
    }
}