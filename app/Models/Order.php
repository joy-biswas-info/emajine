<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'service_id', 'amount', 'stripe_session_id'];

    public function order()
    {
        return $this->belongsTo(User::class);
    }
}
