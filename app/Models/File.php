<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        'file',
        'message_id',
    ];
    public function file()
    {
        return $this->belongsTo(Message::class, 'message_id');
    }
}
