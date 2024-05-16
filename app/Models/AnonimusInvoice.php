<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnonimusInvoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_id',
        'user_email',
        'user_name',
        'currency',
        'expire',
        'price',
        'url',
    ];


}
