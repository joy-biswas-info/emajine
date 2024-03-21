<?php

namespace App\Enums;

enum OrderStatus: string
{

    const processing = 'Processing';
    const completed = 'Completed';


    public static function toArray()
    {
        return [
            self::processing,
            self::completed,
        ];
    }



}