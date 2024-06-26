<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_id',
        'user_id',
        'currency',
        'expire',
        'price',
        'url',
        'service_id'
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
